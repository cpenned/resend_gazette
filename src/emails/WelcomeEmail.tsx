import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  name: string;
  steps?: {
    id: number;
    Description: React.ReactNode;
  }[];
  links?: string[];
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

const PropDefaults: Omit<WelcomeEmailProps, "name"> = {
  steps: [
    {
      id: 1,
      Description: (
        <li className="mb-20" key={1}>
          <strong>Deploy your first project.</strong>{" "}
          <Link>Connect to Git, choose a template</Link>, or manually deploy a
          project you&#39;ve been working on locally.
        </li>
      ),
    },
    {
      id: 2,
      Description: (
        <li className="mb-20" key={2}>
          <strong>Check your deploy logs.</strong> Find out what&#39;s included
          in your build and watch for errors or failed deploys.{" "}
          <Link>Learn how to read your deploy logs</Link>.
        </li>
      ),
    },
    {
      id: 3,
      Description: (
        <li className="mb-20" key={3}>
          <strong>Choose an integration.</strong> Quickly discover, connect, and
          configure the right tools for your project with 150+ integrations to
          choose from. <Link>Explore the Integrations Hub</Link>.
        </li>
      ),
    },
    {
      id: 4,
      Description: (
        <li className="mb-20" key={4}>
          <strong>Set up a custom domain.</strong> You can register a new domain
          and buy it through Resend Gazette or assign a domain you already own
          to your site. <Link>Add a custom domain</Link>.
        </li>
      ),
    },
  ],
  links: ["Visit the forums", "Read the docs", "Contact an expert"],
};

export const WelcomeEmail = ({
  steps = PropDefaults.steps,
  links = PropDefaults.links,
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
                brand: "#2250f4",
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
          <Container className="bg-white p-45">
            <Heading className="text-center my-0 leading-8">
              Welcome to Resend Gazette, {name}
            </Heading>

            <Section>
              <Row>
                <Text className="text-base">
                  You’re joining hundreds of developers around the world who use
                  Resend Gazette to keep up to date with all things Resend.
                </Text>

                <Text className="text-base">Here's how to get started:</Text>
              </Row>
            </Section>

            <ul>{steps?.map(({ Description }) => Description)}</ul>

            <Section className="mt-45">
              <Row>
                {links?.map((link) => (
                  <Column key={link}>
                    <Link className="text-black underline font-bold">
                      {link}
                    </Link>{" "}
                    <span className="text-green-500">→</span>
                  </Column>
                ))}
              </Row>
            </Section>
          </Container>

          <Container className="mt-20">
            <Section>
              <Row>
                <Column className="text-right px-20">
                  <Link>Unsubscribe</Link>
                </Column>
                <Column className="text-left">
                  <Link>Manage Preferences</Link>
                </Column>
              </Row>
            </Section>
            <Text className="text-center text-gray-400 mb-45">
              Resend Gazette, 44 Montgomery Street, Suite 300 San Francisco, CA
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
