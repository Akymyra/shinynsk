"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import ConsultationModal from "../components/ConsultationModal";
import { tires } from "../../data/tires";

type TirePosition = {
  size: string;
  axle: string;
  loadSpeedIndex?: string;
  ply?: string;
  loadIndex?: string;
  speedIndex?: string;

};

type TireModel = {
  brand: string;
  model: string;
  axle: string;
  country?: string;
  images?: string[];
  positions: TirePosition[];
};

type OldTire = {
  brand: string;
  model: string;
  size: string;
  axle: string;
  description?: string;
  ply?: string;
  loadIndex?: string;
  speedIndex?: string;
  loadSpeedIndex?: string;
  layers?: string;
  country?: string;
  manufacturer?: string;
  images?: string[];
};

const brands = [
  { name: "ROADTRACK", src: "/roadtrack.png" },
  { name: "ANNAITE", src: "/annaite.png" },
  { name: "KAPSEN", src: "/kapsen.png" },
  { name: "AUFINE", src: "/aufine.png" },
];

function normalizeSizeSearch(value: string) {
  return value
    .toLowerCase()
    .replace(/\bна\b/gi, "")
    .replace(/[^a-zа-я0-9]/gi, "");
}

function getPreferredSize(
  tire: TireModel,
  selectedSize?: string,
  searchQuery?: string
) {
  if (
    selectedSize &&
    tire.positions.some((position) => position.size === selectedSize)
  ) {
    return selectedSize;
  }

  const normalizedQuery = normalizeSizeSearch(searchQuery || "");

  if (!normalizedQuery) {
    return "";
  }

  const matchedPosition = tire.positions.find((position) => {
    const normalizedSize = normalizeSizeSearch(position.size);

    return (
      normalizedSize.includes(normalizedQuery) ||
      normalizedQuery.includes(normalizedSize)
    );
  });

  return matchedPosition?.size || "";
}

function getAxleStyle(axle: string) {
  const value = axle.toLowerCase();

  if (value.includes("вед")) {
    return "border-orange-400/40 bg-orange-500/10 text-orange-300";
  }

  if (value.includes("прицеп")) {
    return "border-emerald-400/40 bg-emerald-500/10 text-emerald-300";
  }

  if (value.includes("рул")) {
    return "border-blue-400/40 bg-blue-500/10 text-blue-300";
  }

  if (value.includes("универс")) {
    return "border-purple-400/40 bg-purple-500/10 text-purple-300";
  }

  return "border-white/15 bg-white/5 text-zinc-300";
}

function getModelTitle(tire: TireModel) {
  return `${tire.brand} ${tire.model}`.trim();
}

function getMainPosition(tire: TireModel, selectedSize?: string) {
  if (selectedSize) {
    return tire.positions.find((position) => position.size === selectedSize) || tire.positions[0];
  }

  return tire.positions[0];
}

function getLoadSpeed(position?: TirePosition) {
  return position?.loadSpeedIndex || "Уточняйте";
}

function getPly(position?: TirePosition) {
  return position?.ply || "Уточняйте";
}

function buildCatalogModels(source: OldTire[]): TireModel[] {
  const grouped = new Map<string, TireModel>();

  source.forEach((tire) => {
    const brand = tire.brand || "Уточняйте";
    const model = tire.model || "Уточняйте";
    const key = `${brand}-${model}`;
    const loadSpeedIndex =
      tire.loadSpeedIndex ||
      (tire.loadIndex && tire.speedIndex
        ? `${tire.loadIndex}${tire.speedIndex}`
        : tire.loadIndex || tire.speedIndex || "Уточняйте");

    const position: TirePosition = {
      size: tire.size,
      axle: tire.axle || "Уточняйте",
      loadSpeedIndex,
      ply: tire.ply || tire.layers || "Уточняйте",
      loadIndex: tire.loadIndex || "Уточняйте",
      speedIndex: tire.speedIndex || "Уточняйте",
    };

    if (!grouped.has(key)) {
      grouped.set(key, {
        brand,
        model,
        axle: tire.axle || "Уточняйте",
        country: tire.manufacturer || tire.country || (brand === "ANNAITE" ? "Китай" : "Уточняйте"),
        images: tire.images || [],
        positions: [position],
      });
      return;
    }

    const current = grouped.get(key)!;
    current.positions.push(position);

    if (!current.axle.includes(position.axle)) {
      current.axle = `${current.axle} / ${position.axle}`;
    }
  });

  return Array.from(grouped.values()).sort((a, b) => {
    const brandCompare = a.brand.localeCompare(b.brand, "ru", { numeric: true });
    if (brandCompare !== 0) return brandCompare;
    return a.model.localeCompare(b.model, "ru", { numeric: true });
  });
}

function TireModelCard({ tire, onOpen }: { tire: TireModel; onOpen: () => void }) {
  const mainPosition = getMainPosition(tire);
  const previewSizes = tire.positions.slice(0, 3).map((position) => position.size);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-[620px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] text-left transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-white/[0.06] hover:shadow-[0_0_45px_rgba(37,99,235,0.18)]"
    >
      <div className="relative flex h-48 flex-none items-center justify-center border-b border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.015] p-6">
        {tire.images?.[0] ? (
          <Image
            src={tire.images[0]}
            alt={getModelTitle(tire)}
            width={360}
            height={260}
            className="h-40 w-full object-contain transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-black/20 text-center text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
            Фото
            <br />
            скоро
          </div>
        )}

        <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-black tracking-[0.18em] text-white backdrop-blur">
          {tire.brand}
        </div>

        <div className="absolute right-5 top-5 rounded-full border border-blue-400/30 bg-blue-600/20 px-3 py-1 text-xs font-black text-blue-200 backdrop-blur">
          {tire.positions.length} разм.
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="text-2xl font-black leading-tight text-white">
          {getModelTitle(tire)}
        </div>

        <div
          className={`mt-4 inline-flex rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.18em] ${getAxleStyle(
            tire.axle
          )}`}
        >
          {tire.axle}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-zinc-500">Производитель</div>
            <div className="mt-1 font-black text-white">{tire.country || "Уточняйте"}</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-zinc-500">
              Индекс нагрузки/скорости
            </div>
            <div className="mt-1 font-black text-white">
              {getLoadSpeed(mainPosition)}
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {previewSizes.map((size, index) => (
            <span
              key={`${size}-${index}`}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-bold text-zinc-300"
            >
              {size}
            </span>
          ))}

          {tire.positions.length > 3 && (
            <span className="rounded-full border border-blue-400/20 bg-blue-600/10 px-3 py-1 text-xs font-bold text-blue-300">
              +{tire.positions.length - 3} разм.
            </span>
          )}
        </div>

        <div className="mt-auto flex h-12 items-center justify-center rounded-xl bg-blue-600 font-bold text-white transition group-hover:bg-blue-500">
          Подробнее
        </div>
      </div>
    </button>
  );
}

function TireDetailsModal({
  tire,
  selectedSize,
  onClose,
  onConsultation,
}: {
  tire: TireModel;
  selectedSize?: string;
  onClose: () => void;
  onConsultation: () => void;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [isImageOpen, setIsImageOpen] = useState(false);
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const photos = tire.images?.length ? tire.images.slice(0, 3) : [];
  const mainPosition = getMainPosition(tire, selectedSize);

  const specs = [
  { label: "Бренд", value: tire.brand },
  { label: "Модель", value: tire.model },
  { label: "Размер", value: mainPosition?.size || "Уточняйте" },
  { label: "Ось", value: tire.axle },
  { label: "Производитель", value: tire.country || "Китай" },
  { label: "Слойность", value: getPly(mainPosition) },
  {
    label: "Индекс нагрузки/скорости",
    value: getLoadSpeed(mainPosition),
  },
    {
      label: "Количество размеров",
      value: tire.positions.length,
    },
];

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/75 px-4 py-6 backdrop-blur-sm md:px-6 md:py-10"
      onClick={onClose}
    >
      <div
        className="relative mx-auto max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-3xl border border-white/10 bg-[#080B12] p-5 text-white shadow-[0_0_90px_rgba(37,99,235,0.25)] md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-4 z-10 text-3xl text-zinc-400 transition hover:text-white"
        >
          ×
        </button>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.015] p-5 md:min-h-[360px] md:p-8">
              {photos[activeImage] ? (
                <Image
                  src={photos[activeImage]}
                  alt={getModelTitle(tire)}
                  width={700}
                  height={520}
                  onClick={() => setIsImageOpen(true)}
                  className="max-h-[300px] max-w-full cursor-zoom-in object-contain transition hover:scale-105 md:max-h-[430px]"
                />
              ) : (
                <div className="flex h-60 w-60 items-center justify-center rounded-full border border-white/10 bg-black/20 text-center text-sm font-bold uppercase tracking-[0.3em] text-zinc-500">
                  Фото
                  <br />
                  скоро
                </div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`flex h-20 items-center justify-center rounded-2xl border bg-white/[0.03] transition hover:border-blue-400/50 md:h-28 ${
                    activeImage === index
                      ? "border-blue-500 ring-2 ring-blue-500/30"
                      : "border-white/10"
                  }`}
                >
                  {photos[index] ? (
                    <Image
                      src={photos[index]}
                      alt={`${getModelTitle(tire)} фото ${index + 1}`}
                      width={180}
                      height={120}
                      className="max-h-24 w-auto object-contain"
                    />
                  ) : (
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                      Фото {index + 1}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-sm font-bold uppercase tracking-[0.35em] text-blue-400">
              Карточка модели
            </div>

            <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
              {getModelTitle(tire)}
            </h2>

            <div
              className={`mt-5 w-fit rounded-full border px-5 py-2 text-sm font-black uppercase tracking-[0.2em] ${getAxleStyle(
                tire.axle
              )}`}
            >
              {tire.axle}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="text-sm text-zinc-500">{spec.label}</div>
                  <div className="mt-1 text-lg font-black text-white">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-blue-600/10 p-5 text-zinc-300">
              Уточните наличие, цену, год выпуска и условия доставки у менеджера.
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onConsultation}
                className="h-14 w-full rounded-xl bg-blue-600 font-bold transition hover:bg-blue-500 sm:w-[320px]"
              >
                Получить консультацию
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
          <h3 className="text-2xl font-black">Доступные размеры</h3>

          {/* Таблица для ПК */}
<div className="mt-5 hidden overflow-hidden rounded-2xl border border-white/10 md:block">
  <div className="grid grid-cols-4 bg-white/[0.06] text-sm font-black text-zinc-300">
    <div className="p-4">Размер</div>
    <div className="p-4">Ось</div>
    <div className="p-4">Индекс нагрузки/скорости</div>
    <div className="p-4">Слойность</div>
  </div>

  {tire.positions.map((position) => (
    <div
      key={`${position.size}-${position.loadSpeedIndex}-${position.axle}`}
      className="grid grid-cols-4 border-t border-white/10 text-sm text-zinc-300"
    >
      <div className="p-4 font-black text-white">{position.size}</div>
      <div className="p-4">{position.axle}</div>
      <div className="p-4">{getLoadSpeed(position)}</div>
      <div className="p-4">{getPly(position)}</div>
    </div>
  ))}
</div>

          {/* Карточки для телефона */}
          <div className="mt-5 space-y-3 md:hidden">
            {tire.positions.map((position) => (
              <div
                key={`${position.size}-${position.loadSpeedIndex}-${position.axle}-mobile`}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="text-lg font-black text-white">{position.size}</div>

                <div className="mt-4 grid gap-3">
                  <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <div className="text-xs text-zinc-500">Ось</div>
                    <div className="mt-1 font-bold text-white">{position.axle}</div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <div className="text-xs text-zinc-500">Индекс нагрузки/скорости</div>
                    <div className="mt-1 font-bold text-white">
                      {getLoadSpeed(position)}
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <div className="text-xs text-zinc-500">Слойность</div>
                    <div className="mt-1 font-bold text-white">{getPly(position)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
            </div>

      {isImageOpen && photos[activeImage] && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 p-6"
          onClick={() => setIsImageOpen(false)}
        >
          <button
            type="button"
            className="absolute right-6 top-4 text-4xl text-white transition hover:text-blue-300"
            onClick={() => setIsImageOpen(false)}
          >
            ×
          </button>

          <Image
            src={photos[activeImage]}
            alt={getModelTitle(tire)}
            width={1400}
            height={1400}
            className="max-h-[95vh] w-auto object-contain"
          />
        </div>
      )}
    </div>
  );
}

export default function CatalogPage() {
  const [activeTab, setActiveTab] = useState("brands");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedAxle, setSelectedAxle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTire, setSelectedTire] = useState<TireModel | null>(null);
  const [selectedTireSize, setSelectedTireSize] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);

  const catalogModels = useMemo(() => buildCatalogModels(tires as OldTire[]), []);

  const sizes = useMemo(() => {
    return Array.from(
      new Set<string>(catalogModels.flatMap((tire) => tire.positions.map((position) => position.size)))
    ).sort((a, b) => a.localeCompare(b, "ru", { numeric: true }));
  }, [catalogModels]);

  const axles = useMemo(() => {
    return Array.from(
      new Set<string>(catalogModels.flatMap((tire) => tire.positions.map((position) => position.axle)))
    )
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, "ru", { numeric: true }));
  }, [catalogModels]);

  const filteredModels = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return catalogModels.filter((tire) => {
      const matchesBrand = selectedBrand ? tire.brand === selectedBrand : true;
      const matchesSize = selectedSize
        ? tire.positions.some((position) => position.size === selectedSize)
        : true;
      const matchesAxle = selectedAxle
        ? tire.axle === selectedAxle ||
          tire.positions.some((position) => position.axle === selectedAxle)
        : true;
      const matchesSearch = query
        ? `${tire.brand} ${tire.model} ${tire.axle} ${tire.country || ""} ${tire.positions
            .map((position) => `${position.size} ${position.axle} ${position.loadSpeedIndex || ""}`)
            .join(" ")}`
            .toLowerCase()
            .includes(query)
        : true;

      return matchesBrand && matchesSize && matchesAxle && matchesSearch;
    });
  }, [catalogModels, searchQuery, selectedAxle, selectedBrand, selectedSize]);

  function openTireDetails(tire: TireModel) {
    setSelectedTireSize(getPreferredSize(tire, selectedSize, searchQuery));
    setSelectedTire(tire);
  }

  function resetFilters() {
    setSelectedBrand("");
    setSelectedSize("");
    setSelectedAxle("");
    setSearchQuery("");
    setSelectedTireSize("");
  }

  return (
    <main className="min-h-screen bg-[#05070A] text-white">
      <header className="border-b border-white/10 bg-[#05070A]/90 px-6 py-6 backdrop-blur lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
          <a href="/" className="text-2xl font-black tracking-[0.12em] text-white">
            ВШК АЛЬЯНС-ИМПОРТ
          </a>

          <nav className="hidden items-center gap-3 text-base font-medium text-white md:flex">
            <a
              href="/"
              className="rounded-xl border border-white/15 bg-black/20 px-5 py-2 backdrop-blur transition hover:border-white/50 hover:bg-white/10"
            >
              На главную
            </a>

            <button
              type="button"
              onClick={() => setIsContactsOpen(true)}
              className="rounded-xl border border-white/15 bg-black/20 px-5 py-2 backdrop-blur transition hover:border-white/50 hover:bg-white/10"
            >
              Контакты
            </button>

            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="rounded-xl bg-blue-600 px-5 py-2 font-bold transition hover:bg-blue-500"
            >
              Получить консультацию
            </button>
          </nav>
        </div>
      </header>

      <section className="border-b border-white/10 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-blue-400">
            Каталог
          </div>

          <h1 className="text-4xl font-black md:text-5xl">
            Грузовые шины и диски
          </h1>

          <p className="mt-5 max-w-3xl text-lg text-zinc-400">
            Подберите грузовые шины по бренду, размеру или назначению. Нажмите
            на карточку модели, чтобы открыть размеры и характеристики.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/catalog"
              className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white"
            >
              Шины грузовые
            </a>

            <a
              href="/disks"
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:bg-white/10"
            >
              Диски грузовые
            </a>
          </div>

          <div className="mt-10">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по размеру, бренду или модели..."
              className="h-14 w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-400"
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { id: "brands", label: "Бренды" },
              { id: "sizes", label: "Размеры" },
              { id: "axles", label: "Оси" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-xl border px-5 py-3 font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "border-blue-500 bg-blue-600 text-white shadow-[0_0_25px_rgba(37,99,235,0.4)]"
                    : "border-white/10 bg-white/[0.03] text-zinc-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/[0.08] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)]"
                }`}
              >
                {tab.label}
              </button>
            ))}

            {(selectedBrand || selectedSize || selectedAxle || searchQuery) && (
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 font-medium text-zinc-300 transition hover:border-white/40 hover:bg-white/[0.08]"
              >
                Сбросить фильтры
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {activeTab === "brands" && (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {brands.map((brand) => (
                <button
                  key={brand.name}
                  type="button"
                  onClick={() => setSelectedBrand(brand.name)}
                  className={`flex h-20 items-center justify-center rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(255,255,255,0.2)] ${
                    selectedBrand === brand.name
                      ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-[#05070A]"
                      : ""
                  }`}
                >
                  <Image
                    src={brand.src}
                    alt={brand.name}
                    width={240}
                    height={80}
                    className={
                      brand.name === "ROADTRACK"
                        ? "max-h-40 w-auto object-contain"
                        : "max-h-16 w-auto object-contain"
                    }
                  />
                </button>
              ))}
            </div>
          )}

          {activeTab === "sizes" && (
            <div className="grid gap-3 md:grid-cols-4 lg:grid-cols-6">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`flex h-16 items-center justify-center rounded-xl border text-center font-medium transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.06] ${
                    selectedSize === size
                      ? "border-blue-500 bg-blue-600 text-white"
                      : "border-white/10 bg-white/[0.03] text-zinc-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          {activeTab === "axles" && (
            <div className="grid gap-4 md:grid-cols-5">
              {axles.map((axle) => (
                <button
                  key={axle}
                  type="button"
                  onClick={() => setSelectedAxle(axle)}
                  className={`flex h-20 items-center justify-center rounded-2xl border px-4 text-center font-bold transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.06] ${
                    selectedAxle === axle
                      ? "border-blue-500 bg-blue-600 text-white"
                      : "border-white/10 bg-white/[0.03] text-zinc-300"
                  }`}
                >
                  {axle}
                </button>
              ))}
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-end justify-between gap-5 border-t border-white/10 pt-8">
            <div>
              <h2 className="text-3xl font-black">
                {selectedBrand || "Все бренды"}
              </h2>
              <div className="mt-2 text-zinc-500">
                Найдено моделей: {filteredModels.length}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-sm text-zinc-400">
              {selectedSize && (
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
                  Размер: {selectedSize}
                </span>
              )}
              {selectedAxle && (
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
                  Ось: {selectedAxle}
                </span>
              )}
            </div>
          </div>

          {filteredModels.length > 0 ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredModels.map((tire) => (
                <TireModelCard
                  key={`${tire.brand}-${tire.model}`}
                  tire={tire}
                  onOpen={() => openTireDetails(tire)}
                />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-zinc-400">
              Пока нет позиций по выбранным фильтрам. Можно оставить заявку —
              менеджер уточнит наличие.
            </div>
          )}
        </div>
      </section>

      {selectedTire && (
        <TireDetailsModal
          tire={selectedTire}
          selectedSize={selectedTireSize}
          onClose={() => {
            setSelectedTire(null);
            setSelectedTireSize("");
          }}
          onConsultation={() => {
            setSelectedTire(null);
            setSelectedTireSize("");
            setShowModal(true);
          }}
        />
      )}
      {isContactsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm"
          onClick={() => setIsContactsOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#080B12] p-8 text-white shadow-[0_0_80px_rgba(37,99,235,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsContactsOpen(false)}
              className="absolute right-6 top-5 text-2xl text-zinc-400 transition hover:text-white"
              type="button"
            >
              ×
            </button>

            <div className="mb-8">
              <div className="text-sm font-bold uppercase tracking-[0.35em] text-blue-400">
                Контакты
              </div>
              <h2 className="mt-4 text-3xl font-black">Связаться с нами</h2>
            </div>

            <div className="space-y-7">
              <div>
                <div className="text-xl font-black">+7 (902) 068-25-25</div>
                <div className="mt-3 flex flex-wrap gap-3">
                  <a
                    className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold transition hover:border-blue-400 hover:text-white"
                    href="https://t.me/vshktyre"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Telegram
                  </a>
                  <a
                    className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold transition hover:border-green-400 hover:text-white"
                    href="https://wa.me/79020682525"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                  <a
                    className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold transition hover:border-purple-400 hover:bg-purple-500/20 hover:text-white"
                    href="https://max.ru/u/f9LHodD0cOKSGc2h4F4bfjpERaPfNE_w3ukdbIdgqYFq3j7GDNu0MGjyV-U"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MAX
                  </a>
                </div>
              </div>

              <div>
                <div className="text-xl font-black">+7 (913) 381-90-09</div>
                <div className="mt-3 flex flex-wrap gap-3">
                  <a
                    className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold transition hover:border-blue-400 hover:text-white"
                    href="https://t.me/vshktyre"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Telegram
                  </a>
                  <a
                    className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold transition hover:border-green-400 hover:text-white"
                    href="https://wa.me/79133819009"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                  <a
                    className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold transition hover:border-purple-400 hover:bg-purple-500/20 hover:text-white"
                    href="https://max.ru/u/f9LHodD0cOKSGc2h4F4bfjpERaPfNE_w3ukdbIdgqYFq3j7GDNu0MGjyV-U"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MAX
                  </a>
                </div>
              </div>

              <div className="grid gap-5 border-t border-white/10 pt-6 md:grid-cols-2">
                <div>
                  <div className="text-sm text-zinc-500">Почта</div>
                  <a
                    href="mailto:alliance.vshk@gmail.com"
                    className="mt-1 block font-semibold transition hover:text-blue-300"
                  >
                    alliance.vshk@gmail.com
                  </a>
                </div>

                <div>
                  <div className="text-sm text-zinc-500">Режим работы</div>
                  <div className="mt-1 font-semibold">
                    Пн–Пт с 9:00 до 18:00
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="text-sm text-zinc-500">Адрес</div>
                  <div className="mt-1 font-semibold">
                    Новосибирск, ул. Петухова, 89Б
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && <ConsultationModal onClose={() => setShowModal(false)} />}
    </main>
  );
}
