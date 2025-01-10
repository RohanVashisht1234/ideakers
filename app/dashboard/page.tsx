"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Card,
  DarkThemeToggle,
  Flowbite,
  Button,
} from "flowbite-react";
import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Line } from "react-chartjs-2";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiAcademicCap, HiChartBar, HiClipboardList } from "react-icons/hi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { status, data } = useSession();
  const router = useRouter();

  const learningPointsData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Learning Points",
        data: [10, 20, 40, 60],
        backgroundColor: "rgba(147, 51, 234, 0.2)",
        borderColor: "rgba(147, 51, 234, 1)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const courses = [
    { 
      id: 1, 
      title: "Web Development", 
      description: "Learn HTML, CSS, and JavaScript.",
      icon: HiAcademicCap,
    },
    { 
      id: 2, 
      title: "Data Science", 
      description: "Master Python, Pandas, and Machine Learning.",
      icon: HiChartBar,
    },
    { 
      id: 3, 
      title: "Mobile App Development", 
      description: "Build apps using React Native.",
      icon: HiClipboardList,
    },
  ];

  const pendingCourses = [
    "Advanced JavaScript",
    "Machine Learning Basics",
    "UI/UX Design Principles",
  ];

  if (status === "authenticated") {
    return (
      <Flowbite>
        <Navbar
          fluid
          className="sticky top-0 z-50 bg-white dark:bg-gray-900 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
        >
          <NavbarBrand>
            <span className="self-center text-xl font-semibold text-purple-600 dark:text-purple-400">
              Learning Dashboard
            </span>
          </NavbarBrand>
          <NavbarToggle />
          <NavbarCollapse>
            <NavbarLink href="/dashboard" active={true} className="dark:text-white">
              Dashboard
            </NavbarLink>
            <NavbarLink href="#" onClick={() => signOut()} className="dark:text-white">
              Sign Out
            </NavbarLink>
          </NavbarCollapse>
          <DarkThemeToggle />
        </Navbar>

        <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950">
          <div className="container mx-auto p-6">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-800 text-white p-8 rounded-2xl mb-8 shadow-lg"
            >
              <h1 className="text-3xl font-bold mb-2">Hello, {data?.user?.name || "User"}!</h1>
              <p className="text-lg opacity-90">Welcome back to your learning journey</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Learning Points Progress Graph */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="md:col-span-2"
              >
                <Card className="shadow-lg dark:bg-gray-800">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                    <HiChartBar className="text-purple-600" />
                    Your Progress
                  </h2>
                  <Line data={learningPointsData} />
                </Card>
              </motion.div>

              {/* Pending Courses */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="shadow-lg dark:bg-gray-800 h-full">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                    <HiClipboardList className="text-purple-600" />
                    Pending Courses
                  </h2>
                  <ul className="space-y-3">
                    {pendingCourses.map((course, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                        {course}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            </div>

            {/* Courses Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <HiAcademicCap className="text-purple-600" />
                Courses to Explore
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <motion.div
                    key={course.id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="shadow-lg dark:bg-gray-800 h-full">
                      <course.icon className="text-4xl text-purple-600 mb-4" />
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {course.description}
                      </p>
                      <Button gradientDuoTone="purpleToPink" className="w-full">
                        Learn More
                      </Button>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Flowbite>
    );
  } else if (status === "loading") {
    return <span className="text-purple-600 text-sm mt-7 dark:text-purple-400">Loading...</span>;
  } else {
    return redirect("/");
  }
}