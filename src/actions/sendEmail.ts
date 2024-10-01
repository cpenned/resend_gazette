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
    philosophy: z.enum(["on"]).optional(),
  });

  const parse = formSchema.safeParse(Object.fromEntries(formData));

  if (!parse.success) {
    return {
      success: false,
      message: parse.error.message,
      errors: Object.fromEntries(
        parse.error.issues.map((issue) => [issue.path[0], issue.message])
      ),
    };
  }

  try {
    const { error, data } = await resend.emails.send({
      from: "Chris Pennington <chris@codinginpublic.dev>",
      to: [parse.data.email],
      subject: "Hello World",
      react: WelcomeEmail({
        name: parse.data.name,
      }),
      attachments: parse.data.philosophy && [
        {
          path: "https://resend-gazette.vercel.app/docs/resend-philosophy.pdf",
          filename: "resend-philosophy.pdf",
        },
      ],
    });

    if (error) {
      throw new Error(error.message);
    }

    return { message: data?.id, errors: null, success: true };
  } catch (error) {
    console.log(error);
    return { message: (error as Error).message, errors: null, success: false };
  }
}
