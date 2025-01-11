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
  Badge,
  Toast,
  ToastToggle,
} from "flowbite-react";
import { MdLoop } from "react-icons/md";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import {
  HiAcademicCap,
  HiLightningBolt,
  HiTrendingUp,
  HiUserGroup,
  HiShieldCheck,
  HiCode,
  HiGlobe,
  HiChip,
} from "react-icons/hi";
import Link from "next/link";

export default function Home() {
  const { status } = useSession();
  const currentDate = new Date("2025-01-10T21:34:06Z");
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const showSession = () => {
    if (status === "authenticated") return redirect("/dashboard");
    if (status === "loading")
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950">
          <div className="text-purple-600 text-xl">Loading...</div>
        </div>
      );

    return (
      <Flowbite>
        <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950 overflow-x-hidden">
          {/* Navbar */}
          <Navbar
            fluid
            className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
          >
            <NavbarBrand href="/">
              <HiChip className="text-2xl text-purple-600 dark:text-purple-400 mr-2" />
              <span className="self-center text-xl font-semibold text-purple-600 dark:text-purple-400">
                Learnify
              </span>
            </NavbarBrand>
            <NavbarToggle />
            <NavbarCollapse>
              <NavbarLink
                href="#features"
                className="hover:text-purple-600 dark:hover:text-purple-400"
              >
                Features
              </NavbarLink>
              <NavbarLink
                href="#pricing"
                className="hover:text-purple-600 dark:hover:text-purple-400"
              >
                Pricing
              </NavbarLink>
              <NavbarLink
                href="#about"
                className="hover:text-purple-600 dark:hover:text-purple-400"
              >
                About
              </NavbarLink>
              <NavbarLink
                href="/login"
                className="hover:text-purple-600 dark:hover:text-purple-400"
              >
                Login
              </NavbarLink>
              <NavbarLink
                href="/register"
                className="hover:text-purple-600 dark:hover:text-purple-400"
              >
                Signup
              </NavbarLink>
            </NavbarCollapse>
            <DarkThemeToggle />
          </Navbar>
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="container mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center"
          >
            <div className="text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text">
                  Transform Your Learning Journey
                </h1>
                <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
                  Personalized learning experiences powered by AI. Join{" "}
                  {Math.floor(Math.random() * 50000 + 10000).toLocaleString()}+
                  learners today.
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                  <Link href="/login">
                    <Button
                      gradientDuoTone="purpleToPink"
                      size="lg"
                      className="shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                    >
                      Get Started Free
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 dark:bg-purple-900/20 rounded-full blur-3xl" />
              <Image
                src="/hero-illustration.png"
                alt="Learning Illustration"
                width={500}
                height={400}
                className="w-full h-auto relative z-10"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <motion.section
            id="features"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 py-20"
          >
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text">
                  Powerful Learning Features
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Experience the future of education with our cutting-edge
                  features designed to enhance your learning journey.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: HiAcademicCap,
                    title: "AI-Powered Learning",
                    description:
                      "Personalized learning paths that adapt to your progress and learning style in real-time.",
                  },
                  {
                    icon: HiLightningBolt,
                    title: "Interactive Content",
                    description:
                      "Engage with dynamic content, real-time exercises, and hands-on projects.",
                  },
                  {
                    icon: HiTrendingUp,
                    title: "Progress Analytics",
                    description:
                      "Track your growth with detailed insights and performance metrics.",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-600 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-600 to-indigo-600 transform transition-transform duration-300 -translate-y-full group-hover:translate-y-0" />
                    <div className="relative z-10">
                      <feature.icon className="text-5xl text-purple-600 dark:text-purple-400 mb-6 transform transition-transform group-hover:scale-110 duration-300" />
                      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
          {/* Technology Integration Section */}
          <motion.section
            id="technology"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="py-20 bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950"
          >
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text">
                Cutting-Edge Technology Integration
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    icon: HiCode,
                    title: "AI Learning",
                    description: "Advanced algorithms",
                  },
                  {
                    icon: HiGlobe,
                    title: "Global Access",
                    description: "Learn anywhere",
                  },
                  {
                    icon: HiUserGroup,
                    title: "Community",
                    description: "Learn together",
                  },
                  {
                    icon: HiShieldCheck,
                    title: "Security",
                    description: "Enterprise-grade",
                  },
                ].map((tech, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-100 dark:border-purple-900/20 hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-300"
                  >
                    <tech.icon className="mx-auto text-4xl text-purple-600 dark:text-purple-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {tech.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {tech.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Pricing Section */}
          <motion.section
            id="pricing"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 py-20"
          >
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text">
                Flexible Pricing Plans
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Starter",
                    price: "Free",
                    features: [
                      "Basic AI-powered courses",
                      "Community access",
                      "Progress tracking",
                      "Email support",
                    ],
                  },
                  {
                    title: "Pro",
                    price: "$19.99",
                    features: [
                      "All Starter features",
                      "Advanced AI features",
                      "Priority support",
                      "Custom learning paths",
                    ],
                    popular: true,
                  },
                  {
                    title: "Enterprise",
                    price: "Custom",
                    features: [
                      "All Pro features",
                      "Custom solutions",
                      "Dedicated support",
                      "Team analytics",
                    ],
                  },
                ].map((plan, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`relative bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg ${
                      plan.popular
                        ? "border-2 border-purple-500 dark:border-purple-400"
                        : "border border-gray-100 dark:border-gray-600"
                    }`}
                  >
                    {plan.popular && (
                      <Badge
                        color="purple"
                        className="absolute -top-3 right-4"
                        size="lg"
                      >
                        Most Popular
                      </Badge>
                    )}
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      {plan.title}
                    </h3>
                    <p className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text">
                      {plan.price}
                    </p>
                    <ul className="mb-8 space-y-4">
                      {plan.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-gray-600 dark:text-gray-300"
                        >
                          <HiShieldCheck className="text-purple-600 dark:text-purple-400 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      gradientDuoTone="purpleToPink"
                      className="w-full shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                    >
                      Get Started
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* About Section */}
          <motion.section
            id="about"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950 py-20"
          >
            <div className="container mx-auto px-4 text-center max-w-4xl">
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text">
                About Us
              </h2>
              <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
                Learnify is dedicated to revolutionizing the way people learn
                through the power of technology. Our mission is to provide
                accessible, personalized, and impactful learning experiences to
                everyone, anywhere in the world.
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  gradientDuoTone="purpleToPink"
                  size="lg"
                  className="shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                >
                  Read More
                </Button>
                <Button
                  outline
                  gradientDuoTone="purpleToPink"
                  size="lg"
                  className="shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </motion.section>

          {/* Testimonials Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 py-20"
          >
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text">
                What Our Learners Say
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: "John Doe",
                    role: "Software Developer",
                    feedback:
                      "Learnify transformed the way I approach learning. The personalized features are incredible!",
                    image: "/profile1.png",
                  },
                  {
                    name: "Jane Smith",
                    role: "Data Scientist",
                    feedback:
                      "I love the interactive lessons! They make learning so much more engaging and fun.",
                    image: "/profile2.png",
                  },
                  {
                    name: "Alex Johnson",
                    role: "UX Designer",
                    feedback:
                      "The community learning feature helped me connect with like-minded learners. Highly recommended!",
                    image: "/profile3.png",
                  },
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-600"
                  >
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <p className="italic text-gray-600 dark:text-gray-300 mb-4">
                      &quot;{testimonial.feedback}&quot;
                    </p>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-purple-600 dark:text-purple-400">
                      {testimonial.role}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Call-to-Action Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-800 py-20"
          >
            <div className="container mx-auto px-4 text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Start Your Learning Journey Today
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Join{" "}
                {Math.floor(Math.random() * 50000 + 10000).toLocaleString()}+
                learners who are already transforming their future with Learnify
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/login">
                  <Button
                    gradientDuoTone="purpleToPink"
                    size="lg"
                    className="shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                  >
                    Get Started Free
                  </Button>
                </Link>
                <Button
                  outline
                  gradientDuoTone="purpleToPink"
                  size="lg"
                  className="shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </motion.section>

          {/* Blog/Articles Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950 py-16"
          >
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text">
                Latest Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "10 Ways AI is Revolutionizing Learning",
                    description:
                      "Discover how artificial intelligence is transforming education and creating personalized learning experiences.",
                    link: "/blog/ai-revolution",
                    image: "/ai.jpg",
                    date: "January 10, 2025",
                  },
                  {
                    title: "Creating Your Perfect Learning Path",
                    description:
                      "Learn expert tips and strategies for customizing your educational journey for maximum impact.",
                    link: "/blog/personalized-learning",
                    image: "/learn.png",
                    date: "January 9, 2025",
                  },
                  {
                    title: "The Power of Community Learning",
                    description:
                      "Explore how collaborative learning environments enhance knowledge retention and skill development.",
                    link: "/blog/community-learning",
                    image: "/community.jpg",
                    date: "January 8, 2025",
                  },
                ].map((article, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-600 group"
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        width={500}
                        height={300}
                        className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <Badge color="purple" className="mb-2">
                          {article.date}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {article.description}
                      </p>
                      <Button
                        href={"#"}
                        gradientDuoTone="purpleToPink"
                        className="w-full shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                      >
                        Read More
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-900 py-16"
          >
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text">
                Frequently Asked Questions
              </h2>
              <div className="max-w-3xl mx-auto">
                <Accordion collapseAll>
                  {[
                    {
                      question: "What makes Learnify different?",
                      answer:
                        "Learnify stands out with its AI-powered personalized learning paths, interactive content, and real-time adaptation to your learning style. Our platform ensures every learner gets a unique experience tailored to their needs.",
                    },
                    {
                      question: "How does the pricing work?",
                      answer:
                        "We offer flexible plans tailored to your needs. Start with our free tier to explore the platform, upgrade to Pro for advanced features, or choose Enterprise for custom solutions. All plans include core learning features.",
                    },
                    {
                      question: "Is there a free trial available?",
                      answer:
                        "Yes! You can start with our Starter plan completely free. This gives you access to basic courses, community features, and core platform functionality to help you evaluate if Learnify is right for you.",
                    },
                    {
                      question: "How do I get started?",
                      answer:
                        "Getting started is easy! Simply click the 'Get Started Free' button, create your account, and you'll have immediate access to our platform. Our AI will guide you through creating your personalized learning path.",
                    },
                  ].map((faq, index) => (
                    <Accordion.Panel key={index}>
                      <Accordion.Title className="hover:text-purple-600 focus:text-purple-600">
                        {faq.question}
                      </Accordion.Title>
                      <Accordion.Content>
                        <p className="text-gray-600 dark:text-gray-300">
                          {faq.answer}
                        </p>
                      </Accordion.Content>
                    </Accordion.Panel>
                  ))}
                </Accordion>
              </div>
            </div>
          </motion.section>

          {/* Footer */}
          <Footer
            container
            className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-4 gap-8 py-8">
                <div className="md:col-span-1">
                  <Footer.Brand
                    href="/"
                    src="/logo.svg"
                    alt="Learnify Logo"
                    name="Learnify"
                    className="text-purple-600 dark:text-purple-400"
                  />
                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    Empowering learners worldwide with AI-driven education.
                  </p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Last updated: {formattedDate}
                  </p>
                </div>
                <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Platform
                    </h3>
                    <Footer.LinkGroup col>
                      <Footer.Link
                        href="#features"
                        className="hover:text-purple-600"
                      >
                        Features
                      </Footer.Link>
                      <Footer.Link
                        href="#pricing"
                        className="hover:text-purple-600"
                      >
                        Pricing
                      </Footer.Link>
                      <Footer.Link
                        href="#about"
                        className="hover:text-purple-600"
                      >
                        About
                      </Footer.Link>
                      <Footer.Link
                        href="/blog"
                        className="hover:text-purple-600"
                      >
                        Blog
                      </Footer.Link>
                    </Footer.LinkGroup>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Resources
                    </h3>
                    <Footer.LinkGroup col>
                      <Footer.Link href="#" className="hover:text-purple-600">
                        Documentation
                      </Footer.Link>
                      <Footer.Link href="#" className="hover:text-purple-600">
                        Help Center
                      </Footer.Link>
                      <Footer.Link href="#" className="hover:text-purple-600">
                        Community
                      </Footer.Link>
                      <Footer.Link href="#" className="hover:text-purple-600">
                        Tutorials
                      </Footer.Link>
                    </Footer.LinkGroup>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Contact
                    </h3>
                    <Footer.LinkGroup col>
                      <Footer.Link href="#" className="hover:text-purple-600">
                        Support
                      </Footer.Link>
                      <Footer.Link href="#" className="hover:text-purple-600">
                        Sales
                      </Footer.Link>
                      <Footer.Link href="#" className="hover:text-purple-600">
                        Partners
                      </Footer.Link>
                      <Footer.Link href="#" className="hover:text-purple-600">
                        Careers
                      </Footer.Link>
                    </Footer.LinkGroup>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 py-4">
                <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                  © {new Date().getFullYear()} Learnify. All Rights Reserved.
                </div>
              </div>
            </div>
          </Footer>
        </div>
        <div className="fixed bottom-5 right-5 z-50 animate-[slideIn_0.5s_ease-out]">
          <Toast className="bg-white dark:bg-gray-800 shadow-lg border border-purple-100 dark:border-purple-800">
            <div className="flex items-start">
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-500 dark:bg-purple-900 dark:text-purple-300">
                <MdLoop className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">
                <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                  Please Login to use complete website
                </span>
                <div className="mb-2 text-sm font-normal">
                  Logining in is important to use the complete website.
                </div>
                <div className="flex gap-2">
                  <div className="w-auto">
                    <Link href="/login">
                      <Button size="xs" gradientDuoTone="purpleToPink">
                        Login
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <ToastToggle />
            </div>
          </Toast>
        </div>
      </Flowbite>
    );
  };

  // Updated return statement with current user info and date
  return (
    <>
      <div className="hidden">
        <div data-last-updated={currentDate.toISOString()}>
          Last updated: {formattedDate}
        </div>
      </div>
      {showSession()}
    </>
  );
}
