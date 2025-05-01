// app/api/contact/route.js
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { nom, email, telefon, missatge, tipus, tipusFormulari } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Formulari Web - ${nom || "Sense nom"}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    replyTo: email,
    subject: `Nou formulari (${tipusFormulari === "cita" ? "Cita" : "Missatge"}) de ${nom || "Desconegut"}`,
    html: `
      <p><strong>Tipus de formulari:</strong> ${tipusFormulari === "cita" ? "Demanar cita" : "Missatge"}</p>
      <p><strong>Nom:</strong> ${nom || "No especificat"}</p>
      <p><strong>Telèfon:</strong> ${telefon || "No especificat"}</p>
      <p><strong>Correu electrònic:</strong> ${email || "No especificat"}</p>
      <p><strong>Tipus de consulta/servei:</strong> ${tipus || "No especificat"}</p>
      <p><strong>Missatge:</strong><br/>${missatge || "No hi ha cap missatge"}</p>
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

