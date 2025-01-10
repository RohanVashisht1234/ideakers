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
} from "flowbite-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Line } from "react-chartjs-2";
import Link from "next/link";

// Register chart components
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
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const courses = [
    { id: 1, title: "Web Development", description: "Learn HTML, CSS, and JavaScript." },
    { id: 2, title: "Data Science", description: "Master Python, Pandas, and Machine Learning." },
    { id: 3, title: "Mobile App Development", description: "Build apps using React Native." },
  ];

  const pendingCourses = [
    "Advanced JavaScript",
    "Machine Learning Basics",
    "UI/UX Design Principles",
  ];

  if (status === "authenticated") {
    return (
      <Flowbite>
        {/* Navbar */}
        <Navbar fluid={true} rounded={true}>
          <NavbarBrand>
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
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

        {/* Main Dashboard */}
        <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
          {/* Welcome Section */}
          <div className="bg-blue-500 dark:bg-blue-700 text-white p-4 rounded-lg mb-6">
            <h1 className="text-2xl font-bold">Hello, {data?.user?.name || "User"}!</h1>
            <p>Welcome back to your learning dashboard!</p>
          </div>

          {/* Learning Points Progress Graph */}
          <div className="mb-6 max-w-96">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Your Progress</h2>
              <Line data={learningPointsData} />
            </Card>
          </div>

          {/* Courses Showcase */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Courses to Explore</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className="hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700"
                >
                  <h3 className="text-lg font-semibold dark:text-white">{course.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{course.description}</p>
                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
                    Learn More
                  </button>
                </Card>
              ))}
            </div>
          </div>

          {/* Pending Courses */}
          <div>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Pending Courses</h2>
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <ul className="list-disc pl-5 space-y-2">
                {pendingCourses.map((course, index) => (
                  <li key={index} className="text-gray-800 dark:text-gray-300">
                    {course}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </Flowbite>
    );
  } else if (status === "loading") {
    return <span className="text-[#888] text-sm mt-7 dark:text-gray-400">Loading...</span>;
  } else {
    return (
      <Link
        href="/login"
        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-800"
      >
        Sign In
      </Link>
    );
  }
}
