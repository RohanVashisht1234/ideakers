"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Button,
  Card,
  Footer,
  Accordion,
  DarkThemeToggle,
  Flowbite,
} from "flowbite-react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  const showSession = () => {
    if (status === "authenticated") {
      return redirect("/dashboard");
    } else if (status === "loading") {
      return <span className="text-[#888] text-sm mt-7 dark:text-gray-400">Loading...</span>;
    } else {
      return (
        <Flowbite>
          {/* Navbar */}
          <Navbar fluid={true} rounded={true}>
            <NavbarBrand href="/">
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                Learnify
              </span>
            </NavbarBrand>
            <NavbarToggle />
            <NavbarCollapse>
              <NavbarLink href="/features" className="dark:text-white">
                Features
              </NavbarLink>
              <NavbarLink href="/pricing" className="dark:text-white">
                Pricing
              </NavbarLink>
              <NavbarLink href="/faq" className="dark:text-white">
                FAQ
              </NavbarLink>
              <NavbarLink href="/login" className="dark:text-white">
                Login
              </NavbarLink>
            </NavbarCollapse>
            <DarkThemeToggle />
          </Navbar>

          {/* Hero Section */}
          <div className="bg-gray-100 dark:bg-gray-900 py-16 px-6">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
              <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
                  Achieve Your Learning Goals
                </h1>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Start your journey to better skills with personalized guidance and interactive
                  learning.
                </p>
                <div className="mt-8 flex justify-center lg:justify-start space-x-4">
                  <Button gradientDuoTone="blueToPurple">Get Started</Button>
                  <Button outline={true} gradientDuoTone="blueToPurple">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="mt-10 lg:mt-0">
                <Image
                  src="/illustrations/hero-illustration.svg"
                  alt="Hero Illustration"
                  width={500}
                  height={400}
                  className="dark:filter dark:brightness-75"
                />
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="py-16 px-6 bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
                Features That Empower You
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Unlock powerful tools and insights to enhance your learning experience.
              </p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Live Data Insights",
                    desc: "Monitor progress in real-time.",
                  },
                  {
                    title: "Course Recommendations",
                    desc: "AI-powered personalized suggestions.",
                  },
                  {
                    title: "Seamless Integrations",
                    desc: "Connect with your favorite tools.",
                  },
                ].map((feature, index) => (
                  <Card key={index} className="dark:bg-gray-700 dark:border-gray-600">
                    <h3 className="text-lg font-semibold dark:text-white">{feature.title}</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">{feature.desc}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Section with Accordion */}
          <div className="py-16 px-6 bg-gray-100 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white">FAQ</h2>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Frequently Asked Questions about our platform.
              </p>
              <Accordion flush={true} className="mt-8">
                {[
                  {
                    question: "What is Learnify?",
                    answer: "Learnify is an interactive learning platform designed to help you succeed.",
                  },
                  {
                    question: "How does it work?",
                    answer:
                      "With personalized AI recommendations, real-time data insights, and seamless integrations.",
                  },
                  {
                    question: "Is there a free trial?",
                    answer: "Yes, we offer a free trial for 7 days to explore our features.",
                  },
                ].map((faq, index) => (
                  <Accordion.Panel key={index}>
                    <Accordion.Title>{faq.question}</Accordion.Title>
                    <Accordion.Content>
                      <p className="dark:text-gray-400">{faq.answer}</p>
                    </Accordion.Content>
                  </Accordion.Panel>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Footer */}
          <Footer container={true} className="bg-gray-100 dark:bg-gray-900">
            <div className="w-full text-center">
              <Footer.Brand
                href="/"
                src="/logo.svg"
                alt="Learnify Logo"
                name="Learnify"
              />
              <Footer.LinkGroup className="mt-4">
                <Footer.Link href="/features">Features</Footer.Link>
                <Footer.Link href="/pricing">Pricing</Footer.Link>
                <Footer.Link href="/faq">FAQ</Footer.Link>
                <Footer.Link href="/support">Support</Footer.Link>
              </Footer.LinkGroup>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                &copy; 2025 Learnify. All rights reserved.
              </p>
            </div>
          </Footer>
        </Flowbite>
      );
    }
  };

  return <>{showSession()}</>;
}
