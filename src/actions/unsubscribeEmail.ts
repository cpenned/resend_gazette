"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function unsubscribeEmail(_: unknown, formData: FormData) {
  try {
    const formSchema = z.object({
      email: z.string().email({
        message: "Please use a valid email",
      }),
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

    const contactData = await resend.contacts.remove({
      id: parse.data.email,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    });

    if (contactData.error) {
      throw new Error(contactData.error.message);
    }

    return {
      message:
        "You’ve been successfully unsubscribed. We’re sorry to see you go!",
      errors: null,
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { message: (error as Error).message, errors: null, success: false };
  }
}
