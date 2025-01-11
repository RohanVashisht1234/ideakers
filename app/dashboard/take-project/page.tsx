"use client";
import { useState } from "react";
import {
  Button,
  Card,
  Select,
  Label,
  Flowbite,
  TextInput,
  Textarea,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  DarkThemeToggle,
} from "flowbite-react";
import { motion } from "framer-motion";
import {
  HiSearch,
  HiCode,
  HiLightningBolt,
  HiTemplate,
  HiChip,
  HiCube,
  HiDatabase,
} from "react-icons/hi";
import Link from "next/link";

const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

export default function ProjectGeneratorPage() {
  const [projectDescription, setProjectDescription] = useState("");
  const [technology, setTechnology] = useState("");
  const [projectDifficulty, setProjectDifficulty] = useState("Beginner");
  const [additionalRequirements, setAdditionalRequirements] = useState("");
  const [generatedProjects, setGeneratedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentDate = new Date("2025-01-10T21:19:40Z");
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleGenerateProjects = async () => {
    if (!projectDescription || !technology) {
      setError("Please describe your project and specify the technology stack");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectDescription,
          technology,
          difficulty: projectDifficulty,
          additionalRequirements,
        }),
      });

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

  return (
    <Flowbite>
      <Navbar
        fluid
        className="sticky top-0 z-50 bg-white dark:bg-gray-900 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
      >
        <NavbarBrand href="/dashboard">
          <HiCode className="text-2xl text-purple-600 mr-2" />
          <span className="self-center text-xl font-semibold text-purple-600 dark:text-purple-400">
            Project Generator
          </span>
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse>
          <NavbarLink href="/dashboard" className="dark:text-white">
            Dashboard
          </NavbarLink>
          <NavbarLink href="/dashboard/take-course" className="dark:text-white">
            Take Course
          </NavbarLink>
        </NavbarCollapse>
        <DarkThemeToggle />
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
              Hello, RohanVashisht1234!
            </h1>
            <p className="text-lg opacity-90 mb-2">
              Tell us about the project you want to build
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
                <HiCube className="text-3xl text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Project Generator
                </h2>
              </div>

              <div className="grid md:grid-cols-1 gap-6">
                {/* Project Description */}
                <div>
                  <Label
                    htmlFor="projectDescription"
                    value="Project Description"
                    className="text-gray-700 dark:text-gray-300"
                  />
                  <Textarea
                    id="projectDescription"
                    placeholder="Describe the project you want to build (e.g., 'A real-time chat application with video calling features and user authentication')"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="mt-2"
                    rows={4}
                  />
                </div>

                {/* Technology Stack */}
                <div>
                  <Label
                    htmlFor="technology"
                    value="Preferred Technology Stack"
                    className="text-gray-700 dark:text-gray-300"
                  />
                  <TextInput
                    id="technology"
                    placeholder="e.g., React, Node.js, MongoDB, WebRTC"
                    value={technology}
                    onChange={(e) => setTechnology(e.target.value)}
                    icon={HiDatabase}
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

                {/* Additional Requirements */}
                <div>
                  <Label
                    htmlFor="requirements"
                    value="Additional Requirements (Optional)"
                    className="text-gray-700 dark:text-gray-300"
                  />
                  <Textarea
                    id="requirements"
                    placeholder="Any specific features, constraints, or requirements for your project? (e.g., 'Must be mobile-responsive, include dark mode, and support multiple languages')"
                    value={additionalRequirements}
                    onChange={(e) => setAdditionalRequirements(e.target.value)}
                    className="mt-2"
                    rows={3}
                  />
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-4 bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-300 rounded-lg"
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
                  className="w-full md:w-auto"
                >
                  {loading ? "Generating Project..." : "Generate Project"}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Generated Projects Display */}
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
                  <Card className="shadow-lg dark:bg-gray-800 h-full">
                    <HiTemplate className="text-4xl text-purple-600 mb-4" />
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                      {project.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {project.description}
                    </p>
                    <div className="mt-4 mb-4">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Key Features:
                      </h4>
                      <ul className="space-y-2">
                        {project.features?.map((feature: string, i: number) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                          >
                            <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button gradientDuoTone="purpleToPink" className="w-full">
                      Start Project
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </Flowbite>
  );
}
