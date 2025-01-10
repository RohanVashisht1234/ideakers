// app/dashboard/take-course/[...courseName]/page.tsx
"use client";
import { useParams } from 'next/navigation';
import { useState, useEffect } from "react";
import { 
  Button, 
  Card, 
  Spinner, 
  DarkThemeToggle,
  Flowbite 
} from "flowbite-react";

interface CourseContent {
  topics: string[];
  explanations: string[];
}

export default function TakeCoursePage() {
  const params = useParams();
  const courseName = Array.isArray(params.courseName) 
    ? params.courseName.join(' ') 
    : params.courseName;

  const [loading, setLoading] = useState(false);
  const [courseContent, setCourseContent] = useState<CourseContent | null>(null);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number>(0);

  useEffect(() => {
    if (courseName) {
      handleGenerateCourse();
    }
  }, [courseName]);

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
        },
        body: JSON.stringify({ courseName }),
      });

      if (!response.ok) throw new Error("Failed to generate course");

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
    // Split the content into sections
    const sections = content.split('---').filter(section => section.trim() !== '');
    
    // First section contains topics
    const topicsSection = sections[0];
    
    // Remaining sections are explanations
    const explanationsSection = sections.slice(1);

    // Extract topics
    const topics = topicsSection.trim().split('\n')
      .map(topic => topic.replace(/^\d+\.\s*/, '').trim())
      .filter(topic => topic !== '');

    // Extract explanations
    const explanations = explanationsSection
      .map(exp => exp.replace(/^\d+\.\s*/, '').trim())
      .filter(exp => exp !== '');

    return { 
      topics, 
      explanations: explanations.slice(0, topics.length) // Ensure matching length
    };
  };

  return (
    <Flowbite>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
        <div className="absolute top-4 right-4">
          <DarkThemeToggle />
        </div>
        
        <div className="container mx-auto px-4 py-12 max-w-6xl flex">
          {loading ? (
            <div className="flex-grow flex justify-center items-center">
              <Spinner size="xl" color="info" />
              <span className="ml-3 text-xl text-gray-600 dark:text-gray-300">
                Generating Course Content...
              </span>
            </div>
          ) : courseContent ? (
            <div className="flex w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              {/* Left Sidebar - Topics */}
              <div className="w-1/3 bg-gray-100 dark:bg-gray-700 border-r dark:border-gray-600 overflow-y-auto">
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    Course Topics
                  </h2>
                  {courseContent.topics.map((topic, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTopicIndex(index)}
                      className={`w-full text-left p-3 mb-2 rounded-lg transition-colors duration-200 ${
                        selectedTopicIndex === index 
                          ? 'bg-primary-500 text-white' 
                          : 'hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Panel - Explanation */}
              <div className="w-2/3 p-6 overflow-y-auto">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {courseContent.topics[selectedTopicIndex] || 'No Topic Selected'}
                </h3>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {courseContent.explanations[selectedTopicIndex] || 'No explanation available'}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-grow flex justify-center items-center">
              <Button onClick={handleGenerateCourse} color="primary">
                Generate Course Content
              </Button>
            </div>
          )}
        </div>
      </div>
    </Flowbite>
  );
}
