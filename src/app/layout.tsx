import type { Metadata } from "next";
import { inter } from "@/lib/fonts"; // Import Inter font
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

export const metadata: Metadata = {
  title: "Currency Converter by TaskIn Studio", // Updated app title
  description: "Real-time currency conversion tool by TaskIn Studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#a855f7" />
        <meta
          name="description"
          content="Real-time currency conversion tool by TaskIn Studio."
        />
        <meta name="author" content="TaskIn Studio" />
        <meta
          name="keywords"
          content="currency, converter, currency converter, currency exchange, currency conversion, currency rate, currency conversion rate, currency conversion calculator, currency conversion tool, currency conversion app, currency conversion website, currency conversion service, currency conversion software, currency conversion api, currency conversion library, currency conversion module, currency conversion function, currency conversion code, currency conversion script, currency conversion program, currency conversion application, currency conversion service, currency conversion software, currency conversion api, currency conversion library, currency conversion module, currency conversion function, currency conversion code, currency conversion script, currency conversion program, currency conversion application"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="google" content="notranslate" />
        <meta name="msapplication-TileColor" content="#a855f7" />
        <meta name="msapplication-TileImage" content="/logo.svg" />
        <meta name="application-name" content="Taskin Currency Converter" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta
          name="apple-mobile-web-app-title"
          content="Taskin Currency Converter"
        />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />

        {/* social media meta tags */}
        <meta
          property="og:title"
          content="Currency Converter by TaskIn Studio"
        />
        <meta
          property="og:description"
          content="Real-time currency conversion tool by TaskIn Studio."
        />
        <meta property="og:image" content="/logo.svg" />
        <meta property="og:url" content="https://converter.taskin.studio" />
        <meta property="og:type" content="website" />
        <meta
          property="og:site_name"
          content="Currency Converter by TaskIn Studio"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Currency Converter by TaskIn Studio"
        />
        <meta property="og:image:type" content="image/svg+xml" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
