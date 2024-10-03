import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  name: string;
  email: string;
  steps?: {
    id: number;
    Description: React.ReactNode;
  }[];
  links?: { text: string; href: string }[];
}

const PropDefaults: Omit<WelcomeEmailProps, "name" | "email"> = {
  steps: [
    {
      id: 1,
      Description: (
        <li className="mb-20" key={1}>
          <strong>First-class developer experience.</strong> We are a team of
          engineers who love building tools for other engineers. Our goal is to
          create the email platform we&apos;ve always wished we had — one that
          just works.
        </li>
      ),
    },
    {
      id: 2,
      Description: (
        <li className="mb-20" key={2}>
          <strong>Programming languages for all</strong> A simple, elegant
          interface so you can start sending emails in minutes. It fits right
          into your code with SDKs for your favorite programming languages.
        </li>
      ),
    },
    {
      id: 3,
      Description: (
        <li className="mb-20" key={3}>
          <strong>Skip the spam folder</strong> The best way to reach humans
          instead of spam folders. Deliver transactional and marketing emails at
          scale.
        </li>
      ),
    },
    {
      id: 4,
      Description: (
        <li className="mb-20" key={4}>
          <strong>Bringing Resend news to you.</strong> With each new update, we
          will send out a fresh newsletter to keep you up-to-date. You can also
          view all our posts at any time on the Resend blog.
          <Link href="https://resend.com/blog">View all blog posts</Link>.
        </li>
      ),
    },
  ],
  links: [
    {
      text: "View all blog posts",
      href: "https://resend.com/blog",
    },
    {
      text: "View the docs",
      href: "https://resend.com/docs/introduction",
    },
    {
      text: "View your account",
      href: "https://resend.com/login",
    },
  ],
};

export const WelcomeEmail = ({
  steps = PropDefaults.steps,
  links = PropDefaults.links,
  email,
  name,
}: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to the Resend Gazette</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#121212",
                offwhite: "#fafbfb",
              },
              spacing: {
                0: "0px",
                20: "20px",
                45: "45px",
              },
            },
          },
        }}
      >
        <Body className="bg-offwhite text-base font-sans">
          <Container className="bg-white p-20">
            <Heading className="text-center my-0 leading-8">
              Welcome to Resend Gazette, {name}
            </Heading>

            <Section>
              <Row>
                <Text className="text-base">
                  You’re joining hundreds of thousands of developers around the
                  world who subscribe to the Resend Gazette to keep up to date
                  with all things Resend.
                </Text>

                <Text className="text-base">Here’s what you need to know:</Text>
              </Row>
            </Section>

            <ul>{steps?.map(({ Description }) => Description)}</ul>

            <Section className="mt-45">
              <Row>
                {links?.map(({ text, href }) => (
                  <Column key={href}>
                    <Link
                      href={href}
                      className="text-black underline font-bold"
                    >
                      {text}
                    </Link>{" "}
                    <span className="text-[#56D4B9]">→</span>
                  </Column>
                ))}
              </Row>
            </Section>
          </Container>

          <Container className="mt-20 text-center">
            <Section>
              <Row>
                <Column className="px-20">
                  <Text className="text-xs">
                    You are receiving this email because you signed up for the
                    Resend Gazette.
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column className="px-20">
                  <Link
                    href={`https://resend-gazette.vercel.app/unsubscribe?email=${email}`}
                    className="text-xs"
                  >
                    Unsubscribe
                  </Link>
                </Column>
              </Row>
            </Section>
            <Text className="text-center text-gray-400 mb-45 text-xs">
              Resend Gazette, 123 Main St, San Francisco, CA
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
