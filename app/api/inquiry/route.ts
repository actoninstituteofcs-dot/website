import { Resend } from "resend";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();
  if (!name || !email || !message) return Response.json({ error: "Missing fields" }, { status: 400 });
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = `AICS website <${process.env.RESEND_EMAIL_DOMAIN ? `inquiries@${process.env.RESEND_EMAIL_DOMAIN}` : "onboarding@resend.dev"}>`;
  const { error } = await resend.emails.send({ from, to: ["info@actoninstituteofcs.org"], replyTo: email, subject: `Team inquiry from ${name}`, text: `Name: ${name}\nEmail: ${email}\n\n${message}` }, { idempotencyKey: `team-inquiry/${email}-${Date.now()}` });
  if (error) return Response.json({ error: error.message }, { status: 502 });
  return Response.json({ ok: true });
}
