"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        password,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Неверный логин или пароль");
      return;
    }

    router.push("/admin/requests");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border p-6 shadow-lg space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">
          Вход в админ-панель
        </h1>

        <input
          className="w-full border rounded-lg p-3"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />

        <input
          className="w-full border rounded-lg p-3"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-600 text-sm">
            {error}
          </p>
        )}

        <button
          className="w-full rounded-lg bg-blue-600 text-white p-3 hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Входим..." : "Войти"}
        </button>
      </form>
    </main>
  );
}