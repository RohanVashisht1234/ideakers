// app/dashboard/generate-project/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Button,
  Card,
  Select,
  Label,
  Flowbite,
  TextInput,
  Badge,
  Spinner,
  DarkThemeToggle,
} from "flowbite-react";
import {
  HiSearch,
  HiChip,
  HiLightningBolt,
  HiCode,
  HiClock,
  HiUser,
  HiAcademicCap,
} from "react-icons/hi";
import Link from "next/link";

const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

export default function ProjectGeneratorPage() {
  const currentDate = new Date("2025-01-10T22:26:08Z");
  const currentUser = "RohanVashisht1234";

  const { status, data: session } = useSession();
  const router = useRouter();

  const [field, setField] = useState("");
  const [language, setLanguage] = useState("");
  const [projectDifficulty, setProjectDifficulty] = useState("Beginner");
  const [generatedProjects, setGeneratedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        throw new Error("Failed to generate projects");
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
      <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950 p-6">
        {/* Header with user info and theme toggle */}
        <div className="absolute top-4 right-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <HiClock className="text-purple-600 dark:text-purple-400" />
            <Badge color="purple" size="sm">
              {currentDate.toLocaleTimeString()}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <HiUser className="text-purple-600 dark:text-purple-400" />
            <Badge color="purple" size="sm">
              {session?.user?.email || currentUser}
            </Badge>
          </div>
          <DarkThemeToggle />
        </div>

        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mb-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center mb-6">
                <HiChip className="text-4xl text-purple-600 dark:text-purple-400 mr-2" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text">
                  Project Generator
                </h1>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Field Input */}
                <div>
                  <Label
                    htmlFor="field"
                    className="text-gray-700 dark:text-gray-300"
                    value="Learning Field"
                  />
                  <TextInput
                    id="field"
                    placeholder="e.g., Web Development"
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                    icon={HiSearch}
                    className="mt-1"
                  />
                </div>

                {/* Language Input */}
                <div>
                  <Label
                    htmlFor="language"
                    className="text-gray-700 dark:text-gray-300"
                    value="Language/Framework"
                  />
                  <TextInput
                    id="language"
                    placeholder="e.g., React, Python"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    icon={HiCode}
                    className="mt-1"
                  />
                </div>

                {/* Difficulty Selection */}
                <div>
                  <Label
                    htmlFor="difficulty"
                    className="text-gray-700 dark:text-gray-300"
                    value="Project Difficulty"
                  />
                  <Select
                    id="difficulty"
                    value={projectDifficulty}
                    onChange={(e) => setProjectDifficulty(e.target.value)}
                    className="mt-1"
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
                  size="lg"
                  className="shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                >
                  <HiLightningBolt className="mr-2" />
                  {loading ? "Generating Projects..." : "Generate Projects"}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Projects Display */}
          {generatedProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {generatedProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text">
                      {project.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {project.description}
                    </p>
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                        <HiAcademicCap className="text-purple-600 dark:text-purple-400" />
                        Learning Objectives:
                      </h4>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2">
                        {project.learningObjectives?.map(
                          (obj: string, i: number) => <li key={i}>{obj}</li>,
                        )}
                      </ul>
                    </div>
                    <Link
                      href={
                        "/dashboard/take-project/" +
                        encodeURIComponent(project.description)
                      }
                    >
                      <Button
                        gradientDuoTone="purpleToPink"
                        className="mt-4 w-full shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                      >
                        View Project Details
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400"
          >
            Project generation powered by AI • Last updated:{" "}
            {currentDate.toLocaleString()}
          </motion.div>
        </div>
      </div>
    </Flowbite>
  );
}
