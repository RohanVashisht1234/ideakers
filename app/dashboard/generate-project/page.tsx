// app/dashboard/generate-project/page.tsx
"use client";
import { useState } from 'react';
import { 
  Button, 
  Card, 
  Select, 
  Label, 
  Flowbite, 
  TextInput 
} from "flowbite-react";
import { HiSearch } from 'react-icons/hi';

const DIFFICULTIES = [
  "Beginner",
  "Intermediate", 
  "Advanced"
];

export default function ProjectGeneratorPage() {
  const [field, setField] = useState('');
  const [language, setLanguage] = useState('');
  const [projectDifficulty, setProjectDifficulty] = useState('Beginner');
  const [generatedProjects, setGeneratedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateProjects = async () => {
    if (!field || !language) {
      setError("Please enter both field and language");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          field,
          language,
          difficulty: projectDifficulty
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Ensure projects is an array
      const projects = Array.isArray(data.projects) 
        ? data.projects 
        : JSON.parse(data.projects);

      setGeneratedProjects(projects);
    } catch (error) {
      console.error("Project generation failed", error);
      setError(error instanceof Error ? error.message : "Failed to generate projects");
      setGeneratedProjects([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flowbite>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="mb-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Project Generator
            </h1>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Field Input */}
              <div>
                <Label htmlFor="field" value="Learning Field" />
                <TextInput
                  id="field"
                  placeholder="e.g., Web Development"
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  icon={HiSearch}
                />
              </div>

              {/* Language Input */}
              <div>
                <Label htmlFor="language" value="Language/Framework" />
                <TextInput
                  id="language"
                  placeholder="e.g., React, Python"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  icon={HiSearch}
                />
              </div>

              {/* Difficulty Selection */}
              <div>
                <Label htmlFor="difficulty" value="Project Difficulty" />
                <Select 
                  id="difficulty"
                  value={projectDifficulty}
                  onChange={(e) => setProjectDifficulty(e.target.value)}
                >
                  {DIFFICULTIES.map(diff => (
                    <option key={diff} value={diff}>{diff}</option>
                  ))}
                </Select>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-300 rounded-lg">
                {error}
              </div>
            )}

            {/* Generate Button */}
            <div className="mt-6 text-center">
              <Button 
                onClick={handleGenerateProjects}
                disabled={loading}
                color="primary"
                className="mx-auto"
              >
                {loading ? 'Generating Projects...' : 'Generate Projects'}
              </Button>
            </div>
          </Card>

          {/* Projects Display */}
          {generatedProjects.length > 0 && (
            <div className="grid md:grid-cols-3 gap-6">
              {generatedProjects.map((project, index) => (
                <Card 
                  key={index} 
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {project.description}
                  </p>
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                      Learning Objectives:
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                      {project.learningObjectives?.map((obj: string, i: number) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                  <Button color="light" className="mt-4">
                    View Project Details
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Flowbite>
  );
}
