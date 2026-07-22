import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { sendMail } from "@/app/lib/mail";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      phone,
      email,
      comment,
      tireModel,
      tireSize,
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        {
          error: "Укажите имя и телефон",
        },
        {
          status: 400,
        }
      );
    }

    // Сохраняем заявку в базу
    const request = await prisma.consultationRequest.create({
      data: {
        name,
        phone,
        email: email || null,
        comment: comment || "",
        tireModel: tireModel || null,
        tireSize: tireSize || null,
      },
    });

    console.log("REQUEST SAVED:", request.id);

    // Отправка письма максимум 3 секунды,
    // чтобы клиент не ждал
    try {
      await Promise.race([
        sendMail({
          name,
          phone,
          email,
          comment,
          tireModel,
          tireSize,
        }),
        new Promise((resolve) =>
          setTimeout(resolve, 3000)
        ),
      ]);

      console.log("MAIL SENT SUCCESS");
    } catch (mailError) {
      console.error("MAIL ERROR:", mailError);
    }

    return NextResponse.json({
      success: true,
      id: request.id,
    });

  } catch (error) {
    console.error("CONSULTATION ERROR:", error);

    return NextResponse.json(
      {
        error: "Ошибка сервера",
      },
      {
        status: 500,
      }
    );
  }
}

