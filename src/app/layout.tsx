import type { Metadata } from "next";
import localFont from "next/font/local";
import Newspaper from "./components/Newspaper";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Resend Gazette",
  description: "The best way to keep up to date with all things Resend.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="dark" />
        {/* social graph images */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Resend Gazette" />
        <meta
          name="twitter:description"
          content="The best way to keep up to date with all things Resend."
        />
        <meta
          name="twitter:image"
          content="https://resend-gazette.vercel.app/social.jpg"
        />
        <meta property="og:url" content="https://resend-gazette.vercel.app" />
        <meta property="og:title" content="Resend Gazette" />
        <meta
          property="og:description"
          content="The best way to keep up to date with all things Resend."
        />
        <meta
          property="og:image"
          content="https://resend-gazette.vercel.app/social.jpg"
        />
        <meta
          property="og:image:secure_url"
          content="https://resend-gazette.vercel.app/social.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="Resend Gazette" />
        <meta property="og:site_name" content="Resend Gazette" />
        <meta property="og:type" content="website" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#56d4b9" />
        <meta name="msapplication-TileColor" content="#56d4b9" />
        <meta name="theme-color" content="#121212" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-[#00fff61d] selection:text-accent`}
      >
        <div className="~px-4/8 font-[family-name:var(--font-geist-sans)] relative overflow-hidden grid grid-rows-[1fr_auto] min-h-screen">
          <div className="grid place-items-center">
            <div className="absolute w-[60%] h-[30vmax] left-1/2 bg-accent/20 blur-3xl rounded-full -top-1/2 md:-top-1/3 -translate-x-1/2 pointer-events-none -z-10"></div>
            <div className="absolute w-[60%] h-[35vmax] left-1/2 bg-accent/20 blur-3xl rounded-full -bottom-1/4 md:-bottom-1/2 -translate-x-1/2 pointer-events-none -z-10"></div>
            <div>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <Newspaper />
              </div>
              <div className="z-10 w-full">{children}</div>
            </div>
          </div>
          <footer className="bg-background ~p-2/3 w-full grid place-items-center">
            <a
              className="text-center text-xs text-muted underline hover:no-underline"
              href="/unsubscribe"
            >
              Unsubscribe
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
