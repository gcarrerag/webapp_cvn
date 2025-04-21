import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const body = await request.json();
  const { carret } = body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: carret.map((prod) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: prod.nom,
          },
          unit_amount: Math.round(prod.preu * 100), // Preu en cèntims!
        },
        quantity: prod.quantitat || 1,
      })),
      success_url: `${process.env.NEXT_PUBLIC_URL}/gracies`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/carret`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al crear sessió de Stripe" }, { status: 500 });
  }
}
