import nodemailer from "nodemailer";

export async function POST(req) {
  const { nom, telefon, email, tipus, missatge } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
	  from: `"Formulari web - ${nom}" <${process.env.EMAIL_USER}>`,
	  to: process.env.EMAIL_TO,
	  replyTo: email, // ← Això farà que quan facis "respon", responguis al client
	  subject: `Nou missatge de ${nom} (${tipus})`,
	  html: `
	    <p><strong>Nom:</strong> ${nom}</p>
	    <p><strong>Telèfon:</strong> ${telefon}</p>
	    <p><strong>Correu electrònic:</strong> ${email}</p>
	    <p><strong>Tipus:</strong> ${tipus}</p>
	    <p><strong>Missatge:</strong><br/>${missatge}</p>
	  `,
	}


  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error("Error enviant el correu:", error);
    return new Response(JSON.stringify({ ok: false, error: "Error enviant el missatge" }), { status: 500 });
  }
}
