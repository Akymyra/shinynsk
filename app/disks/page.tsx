"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { disks } from "../../data/disks";
import ConsultationModal from "../components/ConsultationModal";

export default function DisksPage() {
  const [showModal, setShowModal] = useState(false);
  const [consultationDisk, setConsultationDisk] = useState("");
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRadius, setSelectedRadius] = useState("");
  const [selectedDiskImage, setSelectedDiskImage] = useState<string | null>(null);
  useEffect(() => {
    if (
      showModal ||
      isContactsOpen ||
      isMobileMenuOpen ||
      selectedDiskImage
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal, isContactsOpen, isMobileMenuOpen, selectedDiskImage]);

  const radiuses = useMemo(() => {
    return Array.from(new Set(disks.map((disk) => disk.size.split("x")[0]))).sort(
        (a, b) => Number(a) - Number(b)
    );
    }, []);

  const filteredDisks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return disks.filter((disk) => {
        const matchesRadius = selectedRadius
        ? disk.size.startsWith(selectedRadius)
        : true;

        const matchesSearch = query
        ? `${disk.brand} ${disk.size} ${disk.holes} ${disk.holeDiameter} ${disk.et} ${disk.dia} ${disk.pcd} ${disk.thickness} ${disk.fullSpec}`
            .toLowerCase()
            .includes(query)
        : true;

        return matchesRadius && matchesSearch;
    });
  }, [searchQuery, selectedRadius]);

  return (
    <main className="min-h-screen bg-[#05070A] text-white">
      <header className="border-b border-white/10 bg-[#05070A]/90 px-6 py-6 backdrop-blur lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
          <a href="/" className="text-2xl font-black tracking-[0.12em] text-white">
            ВШК АЛЬЯНС-ИМПОРТ
          </a>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-black/20 text-2xl text-white backdrop-blur md:hidden"
          >
            ☰
          </button>

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
            Подберите грузовые диски по размеру, разболтовке, вылету и толщине.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/catalog"
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:bg-white/10"
            >
              Шины грузовые
            </a>

            <a
              href="/disks"
              className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white"
            >
              Диски грузовые
            </a>
          </div>
        <div className="mt-10">
        <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по размеру, ET, DIA, разболтовке..."
            className="h-14 w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-400"
        />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
        {radiuses.map((radius) => (
            <button
            key={radius}
            type="button"
            onClick={() => setSelectedRadius(radius)}
            className={`rounded-xl border px-5 py-3 font-medium transition-all duration-300 ${
                selectedRadius === radius
                ? "border-blue-500 bg-blue-600 text-white shadow-[0_0_25px_rgba(37,99,235,0.4)]"
                : "border-white/10 bg-white/[0.03] text-zinc-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/[0.08]"
            }`}
            >
            {radius}
            </button>
        ))}

        {(selectedRadius || searchQuery) && (
            <button
            type="button"
            onClick={() => {
                setSelectedRadius("");
                setSearchQuery("");
            }}
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
          <div className="mb-8">
            <h2 className="text-3xl font-black">YONGZHENG</h2>
           <div className="mt-2 text-zinc-500">
            Найдено дисков: {filteredDisks.length}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredDisks.map((disk, index) => (
              <div
                key={`${disk.size}-${disk.et}-${disk.pcd}-${disk.thickness}-${disk.note || ""}-${index}`}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-blue-400/50 hover:bg-white/[0.06]"
              >
                <div className="flex h-48 items-center justify-center border-b border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.015] p-6">
                  {disk.images?.[0] ? (
                    <Image
                      src={disk.images[0]}
                      alt={disk.fullSpec}
                      width={360}
                      height={260}
                      className="h-40 w-full cursor-zoom-in object-contain transition duration-300 hover:scale-105"
                      onClick={() => setSelectedDiskImage(disk.images?.[0] || null)}
                    />
                  ) : (
                    <div className="flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-black/20 text-center text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                      Фото
                      <br />
                      скоро
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
                    {disk.brand}
                  </div>

                  <h2 className="mt-3 text-3xl font-black">{disk.size}</h2>

                  <div className="mt-3 h-9">
                    {disk.note && (
                      <div className="w-fit rounded-full border border-orange-400/40 bg-orange-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-orange-300">
                        {disk.note}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                    <Spec label="Отверстия" value={disk.holes} />
                    <Spec label="Диаметр отв." value={disk.holeDiameter} />
                    <Spec label="ET" value={disk.et} />
                    <Spec label="DIA" value={disk.dia} />
                    <Spec label="Разболтовка" value={disk.pcd} />
                    <Spec label="Толщина" value={disk.thickness} />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setConsultationDisk(disk.fullSpec);
                      setShowModal(true);
                    }}
                    className="mt-6 h-12 rounded-xl bg-blue-600 font-bold text-white transition hover:bg-blue-500"
                  >
                    Получить консультацию
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isContactsOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm"
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
                  <a className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold transition hover:border-blue-400 hover:text-white" href="https://t.me/vshktyre" target="_blank" rel="noopener noreferrer">Telegram</a>
                  <a className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold transition hover:border-green-400 hover:text-white" href="https://wa.me/79020682525" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                  <a className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold transition hover:border-purple-400 hover:bg-purple-500/20 hover:text-white" href="https://max.ru/u/f9LHodD0cOKSGc2h4F4bfjpERaPfNE_w3ukdbIdgqYFq3j7GDNu0MGjyV-U" target="_blank" rel="noopener noreferrer">MAX</a>
                </div>
              </div>

              <div>
                <div className="text-xl font-black">+7 (913) 381-90-09</div>
                <div className="mt-3 flex flex-wrap gap-3">
                  <a className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold transition hover:border-blue-400 hover:text-white "href="https://t.me/MaximKMS1980" target="_blank" rel="noopener noreferrer">Telegram</a>
                  <a className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold transition hover:border-green-400 hover:text-white" href="https://wa.me/79133819009" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                  <a className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold transition hover:border-purple-400 hover:bg-purple-500/20 hover:text-white" href="https://max.ru/u/f9LHodD0cOJgHIs-uZZblaN1hinobbeG36A9xNmmVObOTdyzbktrA25_dnk" target="_blank" rel="noopener noreferrer">MAX</a>
                </div>
              </div>

              <div className="grid gap-5 border-t border-white/10 pt-6 md:grid-cols-2">
                <div>
                  <div className="text-sm text-zinc-500">Почта</div>
                  <a href="mailto:alliance.vshk@gmail.com" className="mt-1 block font-semibold transition hover:text-blue-300">alliance.vshk@gmail.com</a>
                </div>

                <div>
                  <div className="text-sm text-zinc-500">Режим работы</div>
                  <div className="mt-1 font-semibold">Пн–Пт с 9:00 до 18:00</div>
                </div>

                <div>
                  <div className="text-sm text-zinc-500">Адрес</div>
                  <div className="mt-1 font-semibold">Новосибирск, ул. Петухова, 89Б</div>
                </div>

                <div>
                  <div className="text-sm text-zinc-500">Маршрут</div>
                  <a href="https://go.2gis.com/oqDjQ" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-500">Построить маршрут в 2ГИС</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 px-5 py-6 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="ml-auto w-full max-w-sm rounded-3xl border border-white/10 bg-[#080B12] p-6 shadow-[0_0_80px_rgba(37,99,235,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="text-lg font-black tracking-[0.12em]">
                ВШК
              </div>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl text-zinc-400"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="/"
                className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 font-bold"
              >
                Главная
              </a>

              <a
                href="/catalog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 font-bold"
              >
                Каталог
              </a>

              <a
                href="/#delivery"
                className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 font-bold"
              >
                Доставка
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsContactsOpen(true);
                }}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left font-bold"
              >
                Контакты
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setShowModal(true);
                }}
                className="rounded-xl bg-blue-600 px-5 py-4 font-bold"
              >
                Получить консультацию
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <ConsultationModal
          onClose={() => setShowModal(false)}
          disk={consultationDisk}
        />
      )}
        {selectedDiskImage && (
          <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 p-6"
            onClick={() => setSelectedDiskImage(null)}
          >
            <button
              type="button"
              className="absolute right-6 top-4 text-4xl text-white transition hover:text-blue-300"
              onClick={() => setSelectedDiskImage(null)}
            >
              ×
            </button>

            <Image
              src={selectedDiskImage}
              alt="Фото диска"
              width={1600}
              height={1200}
              className="max-h-[95vh] max-w-full rounded-2xl object-contain"
            />
          </div>
        )}
    </main>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-zinc-500">{label}</div>
      <div className="mt-1 font-black text-white">{value}</div>
    </div>
  );
}