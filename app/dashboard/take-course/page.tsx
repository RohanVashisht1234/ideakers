// /dashboard/take-course/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  Select,
  Label,
  Flowbite,
  TextInput,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  DarkThemeToggle,
  Spinner,
  Badge,
} from "flowbite-react";
import { motion } from "framer-motion";
import {
  HiSearch,
  HiCode,
  HiLightningBolt,
  HiAcademicCap,
  HiChip,
  HiUser,
  HiClock,
  HiLogout,
} from "react-icons/hi";
import Link from "next/link";
import { signOut } from "next-auth/react";

const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

export default function TakeCoursePage() {
  const currentDate = new Date("2025-01-10T22:33:11Z");
  const currentUser = "RohanVashisht1234";

  const { status, data: session } = useSession();
  const router = useRouter();

  const [field, setField] = useState("");
  const [language, setLanguage] = useState("");
  const [projectDifficulty, setProjectDifficulty] = useState("Beginner");
  const [generatedProjects, setGeneratedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Authentication check
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleGenerateProjects = async () => {
    if (!field || !language) {
      setError("Please enter both field and language");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.email}`,
        },
        body: JSON.stringify({
          field,
          language,
          difficulty: projectDifficulty,
          userEmail: session?.user?.email,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return;
        }
        throw new Error("Failed to generate course");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const projects = Array.isArray(data.projects)
        ? data.projects
        : JSON.parse(data.projects);

      setGeneratedProjects(projects);
    } catch (error) {
      console.error("Project generation failed", error);
      setError(
        error instanceof Error ? error.message : "Failed to generate projects",
      );
      setGeneratedProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // Loading state for authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Spinner size="xl" color="purple" />
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading your session...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <Flowbite>
      <Navbar
        fluid
        className="sticky top-0 z-50 bg-white dark:bg-gray-900 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
      >
        <NavbarBrand href="/dashboard">
          <HiChip className="text-2xl text-purple-600 mr-2" />
          <span className="self-center text-xl font-semibold text-purple-600 dark:text-purple-400">
            Course Generator
          </span>
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse>
          <NavbarLink href="/dashboard" className="dark:text-white">
            Dashboard
          </NavbarLink>
          <NavbarLink
            href="/dashboard/generate-project"
            className="dark:text-white"
          >
            Generate Project
          </NavbarLink>
        </NavbarCollapse>
        <div className="flex items-center gap-4">
          <Badge
            color="purple"
            size="sm"
            className="hidden md:flex items-center gap-2"
          >
            <HiUser className="text-purple-600 dark:text-purple-400" />
            {session?.user?.email || currentUser}
          </Badge>
          <Badge
            color="purple"
            size="sm"
            className="hidden md:flex items-center gap-2"
          >
            <HiClock className="text-purple-600 dark:text-purple-400" />
            {currentDate.toLocaleTimeString()}
          </Badge>
          <DarkThemeToggle />
          <Button
            gradientDuoTone="purpleToPink"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <HiLogout className="mr-2" />
            Sign Out
          </Button>
        </div>
      </Navbar>

      <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950">
        <div className="container mx-auto p-6">
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-800 text-white p-8 rounded-2xl mb-8 shadow-lg"
          >
            <h1 className="text-3xl font-bold mb-2">
              Welcome, {session?.user?.name || currentUser}
            </h1>
            <p className="text-lg opacity-90 mb-2">
              Ready to generate your perfect learning path?
            </p>
            <p className="text-sm opacity-75">{formattedDate}</p>
          </motion.div>

          {/* Generator Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="mb-8 shadow-lg dark:bg-gray-800">
              <div className="flex items-center gap-2 mb-6">
                <HiLightningBolt className="text-3xl text-purple-600 dark:text-purple-400" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text">
                  Course Generator
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Field Input */}
                <div>
                  <Label
                    htmlFor="field"
                    value="Learning Field"
                    className="text-gray-700 dark:text-gray-300"
                  />
                  <TextInput
                    id="field"
                    placeholder="e.g., Web Development"
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                    icon={HiSearch}
                    className="mt-2"
                  />
                </div>

                {/* Language Input */}
                <div>
                  <Label
                    htmlFor="language"
                    value="Language/Framework"
                    className="text-gray-700 dark:text-gray-300"
                  />
                  <TextInput
                    id="language"
                    placeholder="e.g., React, Python"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    icon={HiCode}
                    className="mt-2"
                  />
                </div>

                {/* Difficulty Selection */}
                <div>
                  <Label
                    htmlFor="difficulty"
                    value="Project Difficulty"
                    className="text-gray-700 dark:text-gray-300"
                  />
                  <Select
                    id="difficulty"
                    value={projectDifficulty}
                    onChange={(e) => setProjectDifficulty(e.target.value)}
                    className="mt-2"
                  >
                    {DIFFICULTIES.map((diff) => (
                      <option key={diff} value={diff}>
                        {diff}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-4 bg-red-50 dark:bg-red-900/50 text-red-800 dark:text-red-200 rounded-lg"
                >
                  {error}
                </motion.div>
              )}

              {/* Generate Button */}
              <div className="mt-6 text-center">
                <Button
                  onClick={handleGenerateProjects}
                  disabled={loading}
                  gradientDuoTone="purpleToPink"
                  className="w-full md:w-auto shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Spinner size="sm" />
                      <span>Generating Course...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <HiLightningBolt className="text-xl" />
                      <span>Generate Course</span>
                    </div>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Projects Display */}
          {generatedProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {generatedProjects.map((project, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="shadow-lg dark:bg-gray-800 h-full border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-4">
                      <HiAcademicCap className="text-4xl text-purple-600 dark:text-purple-400" />
                      <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text">
                        {project.name}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {project.description}
                    </p>
                    <div className="mt-4 mb-4">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                        <HiLightningBolt className="text-purple-600 dark:text-purple-400" />
                        Learning Objectives:
                      </h4>
                      <ul className="space-y-2">
                        {project.learningObjectives?.map(
                          (obj: string, i: number) => (
                            <li
                              key={i}
                              className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                            >
                              <div className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400"></div>
                              {obj}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                    <Link
                      href={`/dashboard/take-course/${encodeURIComponent(project.name)}`}
                    >
                      <Button
                        gradientDuoTone="purpleToPink"
                        className="w-full shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                      >
                        <HiLightningBolt className="mr-2" />
                        Start Learning
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Stats Display */}
          {generatedProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <Card className="text-center">
                <div className="flex flex-col items-center">
                  <HiLightningBolt className="text-3xl text-purple-600 dark:text-purple-400 mb-2" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Generated Courses
                  </h3>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text">
                    {generatedProjects.length}
                  </p>
                </div>
              </Card>

              <Card className="text-center">
                <div className="flex flex-col items-center">
                  <HiCode className="text-3xl text-purple-600 dark:text-purple-400 mb-2" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Language
                  </h3>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text">
                    {language}
                  </p>
                </div>
              </Card>

              <Card className="text-center">
                <div className="flex flex-col items-center">
                  <HiAcademicCap className="text-3xl text-purple-600 dark:text-purple-400 mb-2" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Difficulty
                  </h3>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text">
                    {projectDifficulty}
                  </p>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400"
          >
            <p>
              Course generation powered by AI • Last updated:{" "}
              {currentDate.toLocaleString()}
            </p>
            <p className="mt-2">
              Logged in as: {session?.user?.email || currentUser} • Session ID:{" "}
              {Math.random().toString(36).substr(2, 9)}
            </p>
          </motion.div>
        </div>
      </div>
    </Flowbite>
  );
}
