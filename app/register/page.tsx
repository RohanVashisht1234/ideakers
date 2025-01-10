"use client";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/actions/register";
import { motion } from "framer-motion";
import { HiChip, HiMail, HiLockClosed, HiUser } from "react-icons/hi";
import { Button } from "flowbite-react";

export default function Register() {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const currentDate = new Date("2025-01-10T21:44:47Z");
  const currentUser = "RohanVashisht1234";

  const handleSubmit = async (formData: FormData) => {
    try {
      const r = await register({
        email: formData.get("email"),
        password: formData.get("password"),
        name: formData.get("name"),
      });
      ref.current?.reset();
      if (r?.error) {
        setError(r.error);
        return;
      } else {
        return router.push("/login");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[400px]"
      >
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <HiChip className="text-4xl text-purple-600 dark:text-purple-400 mr-2" />
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              Learnify
            </span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text">
            Create Your Account
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Join thousands of learners today
          </p>
        </div>

        <motion.form
          ref={ref}
          action={handleSubmit}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 mb-4 text-sm text-red-800 bg-red-50 dark:bg-red-900/50 dark:text-red-200 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  className="block w-full pl-10 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg 
                           text-gray-900 dark:text-white bg-white dark:bg-gray-700
                           focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent
                           placeholder:text-gray-400 dark:placeholder:text-gray-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="block w-full pl-10 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg 
                           text-gray-900 dark:text-white bg-white dark:bg-gray-700
                           focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent
                           placeholder:text-gray-400 dark:placeholder:text-gray-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiLockClosed className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  className="block w-full pl-10 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg 
                           text-gray-900 dark:text-white bg-white dark:bg-gray-700
                           focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent
                           placeholder:text-gray-400 dark:placeholder:text-gray-300"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              gradientDuoTone="purpleToPink"
              className="w-full shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
              size="lg"
            >
              Create Account
            </Button>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition duration-150"
            >
              Already have an account?{" "}
              <span className="font-semibold">Sign in</span>
            </Link>
          </div>
        </motion.form>

        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          By creating an account, you agree to our{" "}
          <Link
            href="/terms"
            className="text-purple-600 dark:text-purple-400 hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-purple-600 dark:text-purple-400 hover:underline"
          >
            Privacy Policy
          </Link>
          <div className="mt-2 text-xs">
            Last updated: {currentDate.toLocaleDateString()}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
