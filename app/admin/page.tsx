import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const token = (await cookies()).get("admin-token")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  try {
    await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );
  } catch {
    redirect("/admin/login");
  }

  redirect("/admin/requests");
}