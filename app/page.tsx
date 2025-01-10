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
} from "flowbite-react";
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
} from "react-icons/hi";

export default function Home() {
  const { status } = useSession();

  const showSession = () => {
    if (status === "authenticated") return redirect("/dashboard");
    if (status === "loading") return <div>Loading...</div>;

    return (
      <Flowbite>
        <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
          {/* Navbar */}
          <Navbar
            fluid
            rounded
            className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md"
          >
            <NavbarBrand href="/">
              <Image
                src="/logo.svg"
                alt="Learnify Logo"
                width={40}
                height={40}
                className="mr-3"
              />
              <span className="self-center text-xl font-semibold dark:text-white">
                Learnify
              </span>
            </NavbarBrand>
            <NavbarToggle />
            <NavbarCollapse>
              <NavbarLink href="/features">Features</NavbarLink>
              <NavbarLink href="/pricing">Pricing</NavbarLink>
              <NavbarLink href="/about">About</NavbarLink>
              <NavbarLink href="/login">Login</NavbarLink>
            </NavbarCollapse>
            <DarkThemeToggle />
          </Navbar>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center"
          >
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Transform Your Learning Journey
              </h1>
              <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
                Personalized learning experiences powered by AI
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <Button gradientDuoTone="purpleToPink" size="lg">
                  Get Started
                </Button>
                <Button outline gradientDuoTone="purpleToPink" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div>
              <Image
                src="/hero-illustration.svg"
                alt="Learning Illustration"
                width={500}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 dark:bg-gray-800 py-16"
          >
            <div className="container mx-auto text-center">
              <h2 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white">
                Powerful Learning Features
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: HiAcademicCap,
                    title: "Personalized Learning",
                    description: "AI-driven adaptive learning paths",
                  },
                  {
                    icon: HiLightningBolt,
                    title: "Interactive Content",
                    description: "Engaging multimedia lessons",
                  },
                  {
                    icon: HiTrendingUp,
                    title: "Progress Tracking",
                    description: "Real-time skill development insights",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg"
                  >
                    <feature.icon className="mx-auto text-5xl text-purple-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Technology Integration Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="py-16 bg-white dark:bg-gray-900"
          >
            <div className="container mx-auto text-center">
              <h2 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white">
                Cutting-Edge Technology Integration
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { icon: HiCode, title: "AI Learning" },
                  { icon: HiGlobe, title: "Global Access" },
                  { icon: HiUserGroup, title: "Community Learning" },
                  { icon: HiShieldCheck, title: "Secure Platform" },
                ].map((tech, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl"
                  >
                    <tech.icon className="mx-auto text-4xl text-blue-600 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {tech.title}
                    </h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Pricing Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gray-50 dark:bg-gray-800 py-16"
          >
            <div className="container mx-auto text-center">
              <h2 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white">
                Flexible Pricing Plans
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Starter",
                    price: "$9.99",
                    features: ["Basic Courses", "Limited Access"],
                  },
                  {
                    title: "Pro",
                    price: "$19.99",
                    features: ["Full Access", "Advanced Features"],
                  },
                  {
                    title: "Enterprise",
                    price: "Custom",
                    features: ["Unlimited Access", "Priority Support"],
                  },
                ].map((plan, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg"
                  >
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      {plan.title}
                    </h3>
                    <p className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">
                      {plan.price}
                    </p>
                    <ul className="mb-6">
                      {plan.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="mb-2 text-gray-600 dark:text-gray-300"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button gradientDuoTone="purpleToPink">Choose Plan</Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
          {/* About */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-900 py-16"
          >
            <div className="container mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
                About Us
              </h2>
              <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
                Learnify is dedicated to revolutionizing the way people learn
                through the power of technology. Our mission is to provide
                accessible, personalized, and impactful learning experiences to
                everyone, anywhere in the world.
              </p>
              <div className="flex justify-center space-x-4">
                <Button gradientDuoTone="tealToLime">Read More</Button>
                <Button outline gradientDuoTone="tealToLime">
                  Contact Us
                </Button>
              </div>
            </div>
          </motion.section>

          {/* Testimonials section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 dark:bg-gray-800 py-16"
          >
            <div className="container mx-auto text-center">
              <h2 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white">
                What Our Learners Say
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: "John Doe",
                    feedback:
                      "Learnify transformed the way I approach learning. The personalized features are incredible!",
                    image: "/testimonials/john.jpg",
                  },
                  {
                    name: "Jane Smith",
                    feedback:
                      "I love the interactive lessons! They make learning so much more engaging and fun.",
                    image: "/testimonials/jane.jpg",
                  },
                  {
                    name: "Alex Johnson",
                    feedback:
                      "The community learning feature helped me connect with like-minded learners. Highly recommended!",
                    image: "/testimonials/alex.jpg",
                  },
                ].map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg"
                  >
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      className="mx-auto rounded-full mb-4"
                    />
                    <p className="italic text-gray-600 dark:text-gray-300">
                      {'"' + testimonial.feedback + '"'}
                    </p>
                    <h3 className="mt-4 font-semibold">{testimonial.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Call-to-Action Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-800 py-16"
          >
            <div className="container mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Transform Your Learning?
              </h2>
              <p className="text-lg mb-8">
                Join thousands of learners on a journey to unlock their
                potential with Learnify.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button gradientDuoTone="purpleToPink" size="lg">
                  Get Started
                </Button>
                <Button outline size="lg" gradientDuoTone="purpleToPink">
                  Contact Sales
                </Button>
              </div>
            </div>
          </motion.section>

          {/* Blog/Articles Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 dark:bg-gray-800 py-16"
          >
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white text-center">
                Latest Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "10 Ways AI is Revolutionizing Learning",
                    description: "Discover how AI is reshaping education.",
                    link: "/blog/ai-revolution",
                    image: "/blog/ai.jpg",
                  },
                  {
                    title: "How to Create a Personalized Learning Plan",
                    description:
                      "Learn tips and tricks for personalizing your study.",
                    link: "/blog/personalized-learning",
                    image: "/blog/personalized.jpg",
                  },
                  {
                    title: "The Benefits of Community Learning",
                    description:
                      "Explore how learning in a community can boost your success.",
                    link: "/blog/community-learning",
                    image: "/blog/community.jpg",
                  },
                ].map((article, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg"
                  >
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={300}
                      height={200}
                      className="rounded-xl mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {article.description}
                    </p>
                    <Button href={article.link} gradientDuoTone="cyanToBlue">
                      Read More
                    </Button>
                  </div>
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
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white text-center">
                Frequently Asked Questions
              </h2>
              <Accordion collapseAll>
                {[
                  {
                    question: "What is Learnify?",
                    answer:
                      "Learnify is a personalized learning platform that leverages AI to create customized learning experiences.",
                  },
                  {
                    question: "How does the pricing work?",
                    answer:
                      "We offer flexible plans tailored to your needs, from individual learners to enterprise solutions.",
                  },
                  {
                    question: "Is there a free trial?",
                    answer:
                      "Yes! You can try Learnify for free with our Starter plan to explore our features.",
                  },
                ].map((faq, index) => (
                  <Accordion.Panel key={index}>
                    <Accordion.Title>{faq.question}</Accordion.Title>
                    <Accordion.Content>
                      <p className="text-gray-600 dark:text-gray-300">
                        {faq.answer}
                      </p>
                    </Accordion.Content>
                  </Accordion.Panel>
                ))}
              </Accordion>
            </div>
          </motion.section>

          {/* Footer */}
          <Footer container className="bg-gray-100 dark:bg-gray-900">
            <div className="w-full text-center">
              <div className="mb-6">
                <Footer.Brand
                  href="/"
                  name="Learnify"
                  src="/logo.svg"
                  alt="Learnify Logo"
                />
              </div>
              <Footer.LinkGroup className="justify-center mb-6">
                <Footer.Link href="/features">Features</Footer.Link>
                <Footer.Link href="/pricing">Pricing</Footer.Link>
                <Footer.Link href="/about">About</Footer.Link>
                <Footer.Link href="/contact">Contact</Footer.Link>
              </Footer.LinkGroup>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Learnify. All Rights Reserved.
              </div>
            </div>
          </Footer>
        </div>
      </Flowbite>
    );
  };

  return <>{showSession()}</>;
}
