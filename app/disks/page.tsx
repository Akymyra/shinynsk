import type { Metadata } from "next";
import DisksClient from "./DisksClient";

export const metadata: Metadata = {
  title: "Грузовые диски | ВШК Альянс-Импорт",

  description:
    "Каталог грузовых дисков YongZheng. Подбор по размеру, ET, DIA и разболтовке.",

  alternates: {
    canonical: "/disks",
  },
  openGraph: {
  title: "Грузовые диски | ВШК Альянс-Импорт",
  description:
    "Каталог грузовых дисков YongZheng. Подбор по размеру, ET, DIA и разболтовке.",
  url: "/disks",
  siteName: "ВШК Альянс-Импорт",
  locale: "ru_RU",
  type: "website",
},
twitter: {
  card: "summary_large_image",
  title: "Грузовые диски | ВШК Альянс-Импорт",
  description:
    "Каталог грузовых дисков YongZheng. Подбор по размеру, ET, DIA и разболтовке.",
},
};

export default function Page() {
  return <DisksClient />;
}