"use client";

import { useState } from "react";

type Props = {
  onClose: () => void;
};

export default function ConsultationModal({ onClose }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!name.trim() || !phone.trim()) {
      setError("Укажите имя и телефон.");
      return;
    }

    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-[#080B12] p-8 text-white shadow-[0_0_80px_rgba(37,99,235,0.25)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-5 text-2xl text-zinc-400 transition hover:text-white"
        >
          ×
        </button>

        <div className="mb-8">
          <div className="text-sm font-bold uppercase tracking-[0.35em] text-blue-400">
            Консультация
          </div>

          <h2 className="mt-4 text-3xl font-black">Получить консультацию</h2>

          <p className="mt-3 text-zinc-400">
            Оставьте контакты и кратко опишите задачу. Менеджер поможет
            подобрать шины и свяжется с вами.
          </p>
        </div>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSending || isSent}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <input
            type="tel"
            placeholder="Телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={isSending || isSent}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <input
            type="email"
            placeholder="Почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSending || isSent}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <textarea
            placeholder="Комментарий: какие шины и на какой транспорт нужны?"
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isSending || isSent}
            className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
          />

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {isSent && (
            <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
              Заявка отправлена. Менеджер свяжется с вами.
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSending || isSent}
            className="h-14 w-full rounded-xl bg-blue-600 font-bold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-900 disabled:text-zinc-400"
          >
            {isSending
              ? "Отправляем..."
              : isSent
                ? "Заявка отправлена"
                : "Отправить заявку"}
          </button>
        </form>
      </div>
    </div>
  );
}