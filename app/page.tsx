"use client";

import Image from "next/image";
import { useState } from "react";
import ConsultationModal from "./components/ConsultationModal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [selectedWarehouseImage, setSelectedWarehouseImage] = useState<string | null>(null);
  const brands = [
  { name: "ROADTRACK", src: "/roadtrack.png", href: "/catalog?brand=roadtrack" },
  { name: "ANNAITE", src: "/annaite.png", href: "/catalog?brand=annaite" },
  { name: "KAPSEN", src: "/kapsen.png", href: "/catalog?brand=kapsen" },
  { name: "AUFINE", src: "/aufine.png", href: "/catalog?brand=aufine" },
  ];

  return (
    <main className="min-h-screen bg-[#05070A] text-white">
      <section className="relative min-h-screen overflow-hidden">
        <Image
          src="/hero-bg.png"
          alt="Грузовые шины и фура"
          fill
          priority
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
        <div className="absolute right-[-160px] top-[-160px] h-[620px] w-[620px] rounded-full bg-blue-600/20 blur-[160px]" />

        <div className="relative z-10 flex min-h-[85vh] w-full flex-col px-5 py-8 sm:px-6 lg:px-20 xl:px-28 2xl:px-36">
          <header className="flex items-start justify-between gap-8">
            <div>
              <div className="text-3xl font-black tracking-[0.12em] max-[380px]:text-2xl lg:text-3xl">
                ВШК АЛЬЯНС-ИМПОРТ
              </div>

              <div className="mt-2 text-xs font-semibold tracking-[0.28em] text-white sm:text-sm">
                ГРУЗОВЫЕ ШИНЫ И ДИСКИ
              </div>
            </div>

            <div className="hidden flex-col items-end gap-4 lg:flex">
              <nav className="flex items-center gap-3 text-base font-medium text-white">
                <a
                  href="#about"
                  className="rounded-xl border border-white/15 bg-black/20 px-5 py-2 backdrop-blur transition hover:border-white/50 hover:bg-white/10"
                >
                  О компании
                </a>

                <a
                  href="/catalog"
                  className="rounded-xl border border-white/15 bg-black/20 px-5 py-2 backdrop-blur transition hover:border-white/50 hover:bg-white/10"
                >
                  Каталог
                </a>

                <a
                  href="#delivery"
                  className="rounded-xl border border-white/15 bg-black/20 px-5 py-2 backdrop-blur transition hover:border-white/50 hover:bg-white/10"
                >
                  Доставка
                </a>

                <button
                  onClick={() => setIsContactsOpen(true)}
                  className="rounded-xl border border-white/15 bg-black/20 px-5 py-2 backdrop-blur transition hover:border-white/50 hover:bg-white/10"
                  type="button"
                >
                  Контакты
                </button>
              </nav>

              <div className="text-right">
                <div className="text-lg font-bold tracking-wide text-white">
                  +7 (902) 068-25-25&nbsp;&nbsp;&nbsp;+7 (913) 381-90-09
                </div>
              </div>
            </div>
          </header>

          <div className="flex flex-1 items-center py-10">
            <div className="w-full max-w-[630px]">
              <h1 className="w-full text-5xl font-black leading-[1.04] tracking-[-0.045em] text-white max-[380px]:text-4xl md:text-6xl">
                Грузовые шины
                <br />
                и диски
              </h1>

              <p className="mt-8 w-full max-w-[630px] text-lg leading-8 text-zinc-300 max-[380px]:text-base max-[380px]:leading-7">
                Подбираем и поставляем грузовые шины и диски для тягачей,
                самосвалов, прицепов и коммерческого транспорта. Работаем с
                юридическими лицами, ИП и частными клиентами.
              </p>

              <div className="mt-10 flex w-full max-w-[630px] flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-5">
                <a
                  href="/catalog"
                  className="group flex h-16 w-full items-center justify-center rounded-xl bg-blue-600 text-base font-bold shadow-[0_0_45px_rgba(37,99,235,0.45)] transition hover:bg-blue-500"
                >
                  Подобрать шины
                </a>

                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="h-16 w-full rounded-xl border border-white/25 bg-black/20 text-base font-bold backdrop-blur transition hover:border-white/50 hover:bg-white/10"
                >
                  Получить консультацию
                </button>
              </div>

              <div className="mt-5 grid w-full max-w-[630px] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                {brands.map((brand) => (
                  <a
                    key={brand.name}
                    href={brand.href}
                    className="flex h-24 w-full items-center justify-center rounded-xl bg-white px-8 shadow-lg transition hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(255,255,255,0.2)]"
                  >
                    <Image
                      src={brand.src}
                      alt={brand.name}
                      width={360}
                      height={120}
                      className={
                        brand.name === "ROADTRACK"
                          ? "max-h-40 w-auto object-contain"
                          : "max-h-16 w-auto object-contain"
                      }
                    />
                  </a>
                ))}
              </div>

              <div className="mt-5 flex w-full max-w-[630px] justify-center">
                <a
                  href="/catalog?category=disks"
                  className="flex h-24 w-full flex-col items-center justify-center rounded-xl bg-white px-8 shadow-lg transition hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(255,255,255,0.2)] sm:w-[300px]"
                >
                  <Image
                    src="/disk-logo.png"
                    alt="YongZheng"
                    width={220}
                    height={70}
                    className="max-h-12 w-auto object-contain"
                  />

                  <span className="mt-1 text-sm font-semibold tracking-wide text-black">
                    YongZheng
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="relative overflow-hidden border-t border-white/10 bg-[#070A0F] py-16 md:py-24"
      >
        <div className="absolute right-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="relative w-full px-6 lg:px-20 xl:px-28 2xl:px-36">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="mb-3 text-lg font-bold uppercase tracking-[0.4em] text-blue-400">
                О компании
              </div>

              <h2 className="max-w-xl text-4xl font-black leading-tight md:text-5xl">
                Грузовые шины и диски для
                <br />
                коммерческого транспорта
              </h2>
             {/* ФОТО СКЛАДА */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src="/company/warehouse-1.png"
                    alt="Склад ВШК"
                    width={600}
                    height={400}
                    className="h-44 w-full cursor-zoom-in object-cover transition duration-300 hover:scale-105 sm:h-56"
                    onClick={() => setSelectedWarehouseImage("/company/warehouse-1.png")}
                  />
                </div>

                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src="/company/warehouse-2.png"
                    alt="Склад ВШК"
                    width={600}
                    height={400}
                    className="h-44 w-full cursor-zoom-in object-cover transition duration-300 hover:scale-105 sm:h-56"
                    onClick={() => setSelectedWarehouseImage("/company/warehouse-2.png")}
                  />
                </div>

                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src="/company/warehouse-3.png"
                    alt="Склад ВШК"
                    width={600}
                    height={400}
                    className="h-44 w-full cursor-zoom-in object-cover transition duration-300 hover:scale-105 sm:h-56"
                    onClick={() => setSelectedWarehouseImage("/company/warehouse-3.png")}
                  />
                </div>

                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src="/company/warehouse-4.png"
                    alt="Склад ВШК"
                    width={600}
                    height={400}
                    className="h-44 w-full cursor-zoom-in object-cover transition duration-300 hover:scale-105 sm:h-56"
                    onClick={() => setSelectedWarehouseImage("/company/warehouse-4.png")}
                  />
                </div>
              </div>
            </div>
            <div className="self-start rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:p-8">
              <p className="text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">
                ВШК «Альянс-Импорт» — поставщик грузовых шин и дисков для перевозчиков,
                строительных компаний, ИП и частных клиентов. Более 15 лет мы работаем
                на рынке грузовых шин и являемся официальным дистрибьютором бренда ANNAITE
                в России. В наличии широкий ассортимент продукции ANNAITE, AUFINE,
                ROADTRACK и KAPSEN для магистральных перевозок, региональных маршрутов
                и строительных работ.
              </p>

              <p className="mt-5 text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">
                Компания располагает сетью филиалов и складов в ключевых регионах России:
                Владивосток, Хабаровск, Красноярск, Новосибирск, Екатеринбург, Москва,
                Ростов-на-Дону и Краснодар. Это позволяет оперативно обеспечивать клиентов
                грузовыми шинами и дисками по всей стране. Центральный склад расположен
                в Новосибирске, что обеспечивает быструю отгрузку по Сибири и удобную
                отправку транспортными компаниями во все регионы России.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/10 bg-[#05070A] py-16 md:py-24">
        <div className="absolute left-[-200px] top-[-200px] h-[520px] w-[520px] rounded-full bg-blue-600/10 blur-[150px]" />

        <div className="relative w-full px-6 lg:px-20 xl:px-28 2xl:px-36">
          <div className="mb-14 max-w-3xl">
            <div className="mb-3 text-lg font-bold uppercase tracking-[0.4em] text-blue-400">
              Почему выбирают нас
            </div>

            <h2 className="text-4xl font-black leading-tight max-[380px]:text-3xl md:text-5xl">
              Надёжный поставщик
              <br />
              грузовых шин и дисков
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: "15+ лет",
                text: "15 лет успешной работы на рынке грузовых шин и дисков. Надежный партнер для перевозчиков и автопарков.",
              },
              {
                title: "5000+",
                text: "Шин и дисков в наличии: популярные размеры, бренды и модели под разные условия эксплуатации.",
              },
              {
                title: "Официальный дистрибьютор",
                text: "Поставляем оригинальную продукцию ANNAITE и работаем с проверенными брендами.",
              },
              {
                title: "Профессиональный подбор",
                text: "Помогаем подобрать шины под технику, нагрузку, маршрут и условия работы.",
              },
              {
                title: "Отправка по России",
                text: "Организуем доставку транспортными компаниями в регионы России.",
              },
              {
                title: "Сервис и сопровождение",
                text: "Консультация, подбор и сопровождение заказа на каждом этапе сотрудничества.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur transition hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/[0.05]"
              >
                <div className="text-2xl font-black text-white">
                  {item.title}
                </div>
                <p className="mt-4 leading-7 text-zinc-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="delivery"
        className="relative overflow-hidden border-t border-white/10 bg-[#05070A] py-16 md:py-24"
      >
        <div className="relative w-full px-6 lg:px-20 xl:px-28 2xl:px-36">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <div className="mb-3 text-lg font-bold uppercase tracking-[0.4em] text-blue-400">
                ДОСТАВКА
              </div>

              <h2 className="text-4xl font-black leading-[1.05] text-white md:text-5xl">
                Грузовых шин
                <br />
                и дисков
              </h2>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur">
                <div className="space-y-5 text-lg leading-8 text-zinc-300">
                  <p>
                    Бесплатная доставка по левому берегу Новосибирска при
                    заказе от 12 шин.
                  </p>

                  <p>
                    Бесплатная доставка по Новосибирску и в радиусе 200 км от
                    города при заказе от 20 шин.
                  </p>

                  <p>
                    Отправляем любой удобной транспортной компанией по всей
                    России.
                  </p>

                  <p className="font-medium text-zinc-200">
                    Все условия доставки уточняйте у менеджера.
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_60px_rgba(37,99,235,0.18)] lg:mt-[130px]">
              <Image
                src="/delivery-banner.png"
                alt="Доставка грузовых шин и дисков"
                width={1200}
                height={800}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {isContactsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm sm:px-6"
          onClick={() => setIsContactsOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#080B12] p-6 text-white shadow-[0_0_80px_rgba(37,99,235,0.25)] sm:p-8"
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

             <div className="grid gap-6 border-t border-white/10 pt-6 md:grid-cols-2">
              <div>
                <div className="text-zinc-500">Почта</div>
                <div className="mt-2 text-xl font-bold">
                  alliance.vshk@gmail.com
                </div>

                <div className="mt-8 text-zinc-500">Адрес</div>
                <div className="mt-2 text-xl font-black sm:text-2xl">
                  Новосибирск, ул. Петухова, 89Б
                </div>
              </div>

              <div>
                <div className="text-zinc-500">Режим работы</div>
                <div className="mt-2 text-xl font-bold">
                  Пн–Пт с 9:00 до 18:00
                </div>

                <div className="mt-8 text-zinc-500">Маршрут</div>

                <a
                  href="https://go.2gis.com/oqDjQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-500"
                >
                  🗺️ Построить маршрут в 2ГИС
                </a>
              </div>
            </div>
              </div>
            </div>
          </div>
      )}

      {showModal && (
        <ConsultationModal onClose={() => setShowModal(false)} />
      )}

      {selectedWarehouseImage && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 p-6"
          onClick={() => setSelectedWarehouseImage(null)}
        >
          <button
            type="button"
            className="absolute right-6 top-4 text-4xl text-white transition hover:text-blue-300"
            onClick={() => setSelectedWarehouseImage(null)}
          >
            ×
          </button>

          <Image
            src={selectedWarehouseImage}
            alt="Фото склада"
            width={1600}
            height={1200}
            className="max-h-[95vh] max-w-full rounded-2xl object-contain"
          />
        </div>
      )}

    </main>
  );
}