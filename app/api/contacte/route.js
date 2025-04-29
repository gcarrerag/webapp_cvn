// app/api/contact/route.ts
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, phone, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Formulari Web - ${name}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    replyTo: email,
    subject: `Nou missatge de ${name}`,
    html: `
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Telèfon:</strong> ${phone}</p>
      <p><strong>Correu electrònic:</strong> ${email}</p>
      <p><strong>Missatge:</strong><br/>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error enviant el correu:", error);
    return NextResponse.json({ success: false, error: "Error enviant el missatge" }, { status: 500 });
  }
}

