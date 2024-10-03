# Resend Gazette

The Resend Gazette is an open source exploration of [Resend](https://resend.com). The project is live and published at [resend-gazette.vercel.app](https://resend-gazette.vercel.app)

## Stack

- NextJS
- Tailwind
- React Email

## Services Highlighted

The **home** route offers three options:

1. Sign up [with an attachment](https://resend.com/docs/dashboard/emails/attachments) (immediate send)
2. Sign up [with a schedule](https://resend.com/docs/dashboard/emails/schedule-email) (sends in 1 minute)
3. [Cancel scheduled email](https://resend.com/docs/dashboard/emails/schedule-email#cancel-a-scheduled-email)

The **unsubscribe** route removes a contact from the audience.

## Email Template

Emails are created with [React Email](https://react.email) and include [unsubscribe headers](https://resend.com/docs/dashboard/emails/add-unsubscribe-to-transactional-emails) and links to the unsubscribe route.

## Audience Interaction

When emails are sent, the user is also added [to an audience](https://resend.com/docs/dashboard/audiences/introduction).

Both canceling a scheduled email and adding an email to the unsubscribe route removes the user from the email list.
