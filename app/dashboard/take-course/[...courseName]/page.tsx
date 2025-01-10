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
import { MdContentCopy, MdDownload } from "react-icons/md";

export default function TakeCoursePage() {
  const params = useParams();
  const courseName = Array.isArray(params.courseName) 
    ? params.courseName.join(' ') 
    : params.courseName;

  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);

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
    setGeneratedContent(null);

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
      setGeneratedContent(data.generatedContent);
    } catch (error) {
      console.error(error);
      alert("Failed to generate course content");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyContent = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      alert("Course content copied to clipboard!");
    }
  };

  const handleDownloadContent = () => {
    if (generatedContent) {
      const blob = new Blob([generatedContent], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${courseName.replace(/\s+/g, '_')}_course_outline.txt`;
      link.click();
    }
  };

  return (
    <Flowbite>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="absolute top-4 right-4">
          <DarkThemeToggle />
        </div>
        
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Card className="mb-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Course: {courseName}
              </h1>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Spinner size="xl" color="info" />
                <span className="ml-3 text-xl text-gray-600 dark:text-gray-300">
                  Generating Course Content...
                </span>
              </div>
            ) : (
              <div className="text-center">
                <Button 
                  onClick={handleGenerateCourse}
                  color="primary"
                  className="mx-auto"
                >
                  Regenerate Course Content
                </Button>
              </div>
            )}
          </Card>

          {generatedContent && (
            <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Course Content
                </h2>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    color="light"
                    onClick={handleCopyContent}
                  >
                    <MdContentCopy className="mr-2" /> Copy
                  </Button>
                  <Button 
                    size="sm" 
                    color="light"
                    onClick={handleDownloadContent}
                  >
                    <MdDownload className="mr-2" /> Download
                  </Button>
                </div>
              </div>
              <div 
                className="whitespace-pre-wrap leading-relaxed 
                           bg-gray-100 dark:bg-gray-800 
                           p-4 rounded-lg 
                           text-gray-800 dark:text-gray-200
                           max-h-[600px] overflow-y-auto"
              >
                {generatedContent}
              </div>
            </Card>
          )}
        </div>
      </div>
    </Flowbite>
  );
}
