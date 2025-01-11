import type { Metadata } from "next";
import { Provider } from "./provider";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeModeScript } from "flowbite-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learnify by Ideakers",
  description:
    "Learnify is an online personalized learning platform by Ideakers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <Provider>
        <body className={inter.className}>{children}</body>
      </Provider>
    </html>
  );
}
