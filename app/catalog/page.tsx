import type { Metadata } from "next";
import CatalogClient from "./CatalogClient";

export const metadata: Metadata = {
  title: "Каталог грузовых шин | ВШК Альянс-Импорт",

  description:
  "Каталог грузовых шин ROADTRACK, ANNAITE, KAPSEN, AUFINE. Подбор по размеру, бренду и оси. Помощь в подборе, доставка по России.",

  alternates: {
    canonical: "/catalog",
  },
  openGraph: {
  title: "Каталог грузовых шин | ВШК Альянс-Импорт",
  description:
  "Каталог грузовых шин ROADTRACK, ANNAITE, KAPSEN, AUFINE. Подбор по размеру, бренду и оси. Помощь в подборе, доставка по России.",
  url: "/catalog",
  siteName: "ВШК Альянс-Импорт",
  locale: "ru_RU",
  type: "website",
},
twitter: {
  card: "summary_large_image",
  title: "Каталог грузовых шин | ВШК Альянс-Импорт",
  description:
  "Каталог грузовых шин ROADTRACK, ANNAITE, KAPSEN, AUFINE. Подбор по размеру, бренду и оси. Помощь в подборе, доставка по России.",
},
};

export default function Page() {
  return <CatalogClient />;
}
