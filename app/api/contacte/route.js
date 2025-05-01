// app/api/contact/route.js
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {

  const { nom, email, telefon, missatge, tipus } = await req.json();


  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
	  from: `"Formulari Web - ${nom}" <${process.env.EMAIL_USER}>`,
	  to: process.env.EMAIL_TO,
	  replyTo: email,
	  subject: `Nou missatge de ${nom}`,
	  html: `
	    <p><strong>Nom:</strong> ${nom}</p>
	    <p><strong>Telèfon:</strong> ${telefon}</p>
	    <p><strong>Correu electrònic:</strong> ${email}</p>
	    <p><strong>Tipus de consulta:</strong> ${tipus}</p>
	    <p><strong>Missatge:</strong><br/>${missatge}</p>
	  `,
	}


  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error enviant el correu:", error);
    return NextResponse.json({ success: false, error: "Error enviant el missatge" }, { status: 500 });
  }
}

