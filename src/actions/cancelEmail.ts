"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function cancelEmail(_: unknown, formData: FormData) {
  const formSchema = z.object({
    email: z.string().email(),
    emailId: z.string().min(1),
  });

  const parse = formSchema.safeParse(Object.fromEntries(formData));

  if (!parse.success) {
    return {
      success: false,
      message: parse.error.message,
    };
  }

  try {
    const emailData = await resend.emails.cancel(parse.data.emailId);

    // add to audience
    const audienceData = await resend.contacts.remove({
      id: parse.data.email,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    });

    if (emailData.error) {
      throw new Error(emailData.error.message);
    }

    if (audienceData.error) {
      throw new Error(audienceData.error.message);
    }

    return {
      message: "We’ve cancelled your subscription.",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: (error as Error).message,
      success: false,
    };
  }
}
