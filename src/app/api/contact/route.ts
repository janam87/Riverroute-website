import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.type || !body.email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    // 1. Send email notification
    const emailPromise = transporter.sendMail({
      from: `"The Riverroute" <${process.env.SMTP_USER}>`,
      to: "varun.khandelwal@theriverroute.com",
      subject: `New Waitlist Signup: ${body.email}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background: #111; color: #fff; border-radius: 12px;">
          <h2 style="margin: 0 0 16px;">New Waitlist Signup</h2>
          <p style="color: #aaa; margin: 0 0 20px;">Someone has shown interest in The Riverroute.</p>
          <table>
            <tr><td style="padding: 6px 16px 6px 0; color: #888;">Email</td><td style="color: #fff;"><strong>${body.email}</strong></td></tr>
            <tr><td style="padding: 6px 16px 6px 0; color: #888;">Source</td><td style="color: #fff;">${body.type}</td></tr>
            <tr><td style="padding: 6px 16px 6px 0; color: #888;">Time</td><td style="color: #fff;">${timestamp}</td></tr>
          </table>
        </div>
      `,
    });

    // 2. Send confirmation email to the user
    const confirmationPromise = transporter.sendMail({
      from: `"The Riverroute" <${process.env.SMTP_USER}>`,
      to: body.email,
      subject: "You're on the list — The Riverroute",
      html: `
        <div style="font-family: sans-serif; padding: 32px; background: #111; color: #fff; border-radius: 12px; max-width: 480px;">
          <h2 style="margin: 0 0 12px; font-size: 22px;">Welcome to The Riverroute</h2>
          <p style="color: #aaa; margin: 0 0 20px; line-height: 1.6;">
            Thanks for signing up! We've added you to our waitlist and will be in touch soon with updates.
          </p>
          <p style="color: #555; font-size: 12px; margin: 0;">
            — Team Riverroute
          </p>
        </div>
      `,
    });

    // 3. Add to Google Sheet (via Apps Script)
    const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK;
    const sheetPromise = sheetUrl
      ? fetch(sheetUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: body.email, type: body.type }),
        }).catch(() => null)
      : Promise.resolve(null);

    // Run both in parallel
    await Promise.all([emailPromise, confirmationPromise, sheetPromise]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
