import type { Metadata } from "next";
import DisksClient from "./DisksClient";

export const metadata: Metadata = {
  title: "Грузовые диски | ВШК Альянс-Импорт",

  description:
     "Каталог грузовых дисков YongZheng. Подбор по размеру, ET, DIA и разболтовке. Помощь в подборе, доставка по России.",

  alternates: {
    canonical: "/disks",
  },
  openGraph: {
  title: "Грузовые диски | ВШК Альянс-Импорт",
  description:
     "Каталог грузовых дисков YongZheng. Подбор по размеру, ET, DIA и разболтовке. Помощь в подборе, доставка по России.",
  url: "/disks",
  siteName: "ВШК Альянс-Импорт",
  locale: "ru_RU",
  type: "website",
},
twitter: {
  card: "summary_large_image",
  title: "Грузовые диски | ВШК Альянс-Импорт",
  description:
     "Каталог грузовых дисков YongZheng. Подбор по размеру, ET, DIA и разболтовке. Помощь в подборе, доставка по России.",
},
};

export default function Page() {
  return <DisksClient />;
}