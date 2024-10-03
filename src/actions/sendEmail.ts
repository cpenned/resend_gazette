"use server";

import { Resend } from "resend";
import { z } from "zod";

import { WelcomeEmail } from "@/emails/WelcomeEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(_: unknown, formData: FormData) {
  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email({
      message: "Please use a valid email",
    }),
    attachment: z.enum(["on"]).optional(),
  });

  try {
    const parse = formSchema.safeParse(Object.fromEntries(formData));

    if (!parse.success) {
      return {
        success: false,
        message: parse.error.message,
        cancelEmailId: null,
        cancelEmail: null,
        errors: Object.fromEntries(
          parse.error.issues.map((issue) => [issue.path[0], issue.message])
        ),
      };
    }

    const shouldSchedule = !parse.data.attachment;

    const emailData = await resend.emails.send({
      from: "Chris Pennington <chris@codinginpublic.dev>",
      to: [parse.data.email],
      subject: "Welcome to the Resend Gazette!",
      react: WelcomeEmail({
        name: parse.data.name,
        email: parse.data.email,
      }),
      attachments: parse.data.attachment && [
        {
          path: "https://resend-gazette.vercel.app/docs/resend-philosophy.pdf",
          filename: "resend-philosophy.pdf",
        },
      ],
      scheduledAt: shouldSchedule
        ? // send 1 min from now if no attachement
          "in 1 min"
        : undefined,
      headers: {
        "List-Unsubscribe": `<https://resend-gazette.vercel.app/unsubscribe?email=${parse.data.email}>`,
      },
    });

    // add to audience
    const audienceData = await resend.contacts.create({
      email: parse.data.email,
      firstName: parse.data.name,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    });

    if (emailData.error) {
      throw new Error(emailData.error.message);
    }

    if (audienceData.error) {
      throw new Error(audienceData.error.message);
    }

    return {
      message: "Thank you for subscribing!",
      cancelEmailId: emailData.data?.id,
      cancelEmail: shouldSchedule ? parse.data.email : null,
      errors: null,
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: (error as Error).message,
      cancelEmail: null,
      cancelEmailId: null,
      errors: null,
      success: false,
    };
  }
}
