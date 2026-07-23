"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteRequest(formData: FormData) {
  const id = Number(formData.get("id"));

  await prisma.consultationRequest.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/requests");
}