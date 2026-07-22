import nodemailer from "nodemailer";

export async function sendMail(options: {
  name: string;
  phone: string;
  email?: string;
  comment: string;
  tireModel?: string;
  tireSize?: string;
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"VSHK Сайт" <${process.env.SMTP_USER}>`,
    to: process.env.MAIL_TO,
    subject: "Новая заявка с сайта ВШК",
    html: `
      <h2>Новая заявка</h2>

      <p><b>Имя:</b> ${options.name}</p>
      <p><b>Телефон:</b> ${options.phone}</p>
      <p><b>Почта:</b> ${options.email || "-"}</p>

      <p><b>Модель:</b> ${options.tireModel || "-"}</p>
      <p><b>Размер:</b> ${options.tireSize || "-"}</p>

      <p><b>Комментарий:</b></p>
      <p>${options.comment}</p>
    `,
  });
}
