import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Грузовые шины и диски в Новосибирске | ВШК Альянс-Импорт",

  description:
    "Продажа грузовых шин и дисков в Новосибирске. ROADTRACK, ANNAITE, KAPSEN, AUFINE. Доставка по России. Подбор под любую технику.",

  alternates: {
    canonical: "/",
  },
  openGraph: {
  title: "Грузовые шины и диски в Новосибирске | ВШК Альянс-Импорт",
  description:
    "Продажа грузовых шин и дисков в Новосибирске. ROADTRACK, ANNAITE, KAPSEN, AUFINE. Доставка по России.",
  url: "/",
  siteName: "ВШК Альянс-Импорт",
  locale: "ru_RU",
  type: "website",
},
twitter: {
  card: "summary_large_image",
  title: "Грузовые шины и диски в Новосибирске | ВШК Альянс-Импорт",
  description:
    "Продажа грузовых шин и дисков в Новосибирске. ROADTRACK, ANNAITE, KAPSEN, AUFINE. Доставка по России.",
},
};

export default function Page() {
  return <HomeClient />;
}