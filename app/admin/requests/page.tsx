import { prisma } from "@/lib/prisma";
import { deleteRequest } from "./actions";

export default async function RequestsPage({
    searchParams,
    }: {
    searchParams: Promise<{ search?: string }>;
    }) {
  const { search = "" } = await searchParams;
  const totalRequests = await prisma.consultationRequest.count();
  const requests = await prisma.consultationRequest.findMany({
  where: search
    ? {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: search,
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            tireModel: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            tireSize: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            comment: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }
    : undefined,

  orderBy: {
    createdAt: "desc",
  },
});

  return (
    <main className="p-8">
        <div className="mb-6">
            <h1 className="text-3xl font-bold">
                Заявки с сайта
            </h1>

            <p className="mt-2 text-zinc-400">
                Всего заявок:{" "}
                <span className="font-semibold text-white">
                    {totalRequests}
                </span>
            </p>

            {search && (
                <p className="mt-1 text-zinc-400">
                    Поиск:{" "}
                    <span className="font-semibold text-white">
                    "{search}"
                    </span>{" "}
                    — найдено{" "}
                    <span className="font-semibold text-white">
                    {requests.length}
                    </span>{" "}
                    {requests.length === 1
                    ? "заявка"
                    : requests.length >= 2 && requests.length <= 4
                    ? "заявки"
                    : "заявок"}
                </p>
                )}
            </div>
      <form className="mb-6 flex gap-3">
        <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Поиск по имени, телефону, email, модели..."
            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-blue-500"
        />

        <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
            Найти
        </button>

        <a
            href="/admin/requests"
            className="rounded-lg bg-zinc-700 px-6 py-3 font-medium text-white transition hover:bg-zinc-600"
        >
            Сбросить
        </a>
        </form>

      <div className="overflow-x-auto rounded-lg border border-zinc-700">
        <table className="w-full">
          <thead className="bg-zinc-900">
            <tr>
              <th className="p-3 text-left">Дата</th>
              <th className="p-3 text-left">Имя</th>
              <th className="p-3 text-left">Телефон</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Модель</th>
              <th className="p-3 text-left">Размер</th>
              <th className="p-3 text-left">Комментарий</th>
              <th className="p-3 text-center">Действия</th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="p-6 text-center text-zinc-400"
                >
                  Заявок пока нет
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr
                  key={request.id}
                  className="border-t border-zinc-700 hover:bg-zinc-900 transition"
                >
                  <td className="p-3 whitespace-nowrap">
                    {request.createdAt.toLocaleString("ru-RU")}
                  </td>

                  <td className="p-3 whitespace-nowrap">
                    {request.name}
                  </td>

                  <td className="p-3 whitespace-nowrap">
                    {request.phone}
                  </td>

                  <td className="p-3 whitespace-nowrap">
                    {request.email || "-"}
                  </td>

                  <td className="p-3">
                    {request.tireModel || "-"}
                  </td>

                  <td className="p-3">
                    {request.tireSize || "-"}
                  </td>

                  <td className="p-3 max-w-xs break-words">
                    {request.comment}
                  </td>

                  <td className="p-3">
                    <form action={deleteRequest}>
                      <input
                        type="hidden"
                        name="id"
                        value={request.id}
                      />                      <button
                        type="submit"
                        className="rounded bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                      >
                        Удалить
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}