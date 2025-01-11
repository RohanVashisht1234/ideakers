// app/dashboard/take-course/[...courseName]/page.tsx
"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import {
  Button,
  Card,
  Spinner,
  DarkThemeToggle,
  Flowbite,
  Badge,
} from "flowbite-react";
import {
  HiChip,
  HiBookOpen,
  HiLightningBolt,
  HiAcademicCap,
  HiClock,
  HiUser,
} from "react-icons/hi";

interface CourseContent {
  topics: string[];
  explanations: string[];
}

export default function TakeCoursePage() {
  const currentDate = new Date("2025-01-10T22:20:34Z");

  const { status, data: session } = useSession();
  const router = useRouter();
  const params = useParams();

  const courseName = Array.isArray(params.courseName)
    ? params.courseName.join(" ")
    : params.courseName;

  const [loading, setLoading] = useState(false);
  const [courseContent, setCourseContent] = useState<CourseContent | null>(
    null,
  );
  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number>(0);

  // Authentication check
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (courseName && status === "authenticated") {
      handleGenerateCourse();
    }
  }, [courseName, status]);

  const handleGenerateCourse = async () => {
    if (!courseName) {
      alert("Invalid course name");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/generate-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.email}`, // Add authentication header
        },
        body: JSON.stringify({
          courseName,
          userEmail: session?.user?.email, // Include user email for tracking
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
      const parsedContent = parseGeneratedContent(data.generatedContent);
      setCourseContent(parsedContent);
      setSelectedTopicIndex(0);
    } catch (error) {
      console.error(error);
      alert("Failed to generate course content");
    } finally {
      setLoading(false);
    }
  };

  const parseGeneratedContent = (content: string): CourseContent => {
    const sections = content
      .split("---")
      .filter((section) => section.trim() !== "");
    const topicsSection = sections[0];
    const explanationsSection = sections.slice(1);

    const topics = topicsSection
      .trim()
      .split("\n")
      .map((topic) => topic.replace(/^\d+\.\s*/, "").trim())
      .filter((topic) => topic !== "");

    const explanations = explanationsSection
      .map((exp) => exp.replace(/^\d+\.\s*/, "").trim())
      .filter((exp) => exp !== "");

    return {
      topics,
      explanations: explanations.slice(0, topics.length),
    };
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

  // Authenticated content
  return (
    <Flowbite>
      <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950">
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
              {session?.user?.name}
            </Badge>
          </div>
          <DarkThemeToggle />
        </div>

        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center mb-6">
              <HiChip className="text-4xl text-purple-600 dark:text-purple-400 mr-2" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text">
                Your Personalized Course
              </h1>
            </div>
          </motion.div>

          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-grow flex flex-col items-center justify-center p-12 bg-white dark:bg-gray-800 rounded-xl shadow-xl"
            >
              <Spinner size="xl" color="purple" />
              <span className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                Generating Your Personalized Course Content...
              </span>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                This may take a few moments
              </p>
            </motion.div>
          ) : courseContent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Left Sidebar - Topics */}
              <div className="w-1/3 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text flex items-center gap-2">
                    <HiBookOpen className="text-purple-600 dark:text-purple-400" />
                    Course Topics
                  </h2>
                  <div className="space-y-2">
                    {courseContent.topics.map((topic, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedTopicIndex(index)}
                        className={`w-full text-left p-4 rounded-lg transition-all duration-200 flex items-center gap-3
                          ${
                            selectedTopicIndex === index
                              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                              : "hover:bg-purple-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                          }`}
                      >
                        <HiLightningBolt
                          className={`${
                            selectedTopicIndex === index
                              ? "text-white"
                              : "text-purple-600 dark:text-purple-400"
                          }`}
                        />
                        {topic}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel - Explanation */}
              <div className="w-2/3 p-8 overflow-y-auto">
                <motion.div
                  key={selectedTopicIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text flex items-center gap-3">
                    <HiLightningBolt className="text-purple-600 dark:text-purple-400" />
                    {courseContent.topics[selectedTopicIndex] ||
                      "No Topic Selected"}
                  </h3>
                  <div className="prose prose-purple dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
                    {courseContent.explanations[selectedTopicIndex] ||
                      "No explanation available"}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-grow flex justify-center items-center p-12 bg-white dark:bg-gray-800 rounded-xl shadow-xl"
            >
              <Button
                gradientDuoTone="purpleToPink"
                size="xl"
                onClick={handleGenerateCourse}
                className="shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
              >
                <HiLightningBolt className="mr-2" />
                Generate Course Content
              </Button>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400"
          >
            Course generation powered by AI • Last updated:{" "}
            {currentDate.toLocaleString()}
          </motion.div>
        </div>
      </div>
    </Flowbite>
  );
}
