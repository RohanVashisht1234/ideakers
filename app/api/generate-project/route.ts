import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  try {
    const { field, language, difficulty } = await request.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate 3-4 ${difficulty} project ideas for ${field} using ${language}. 
    Ensure the response is a valid JSON array with these keys:
    - name: string
    - description: string
    - learningObjectives: string[]
    - complexity: string
    - technologies: string[]

    Example:
    [
      {
        "name": "Project Name",
        "description": "Project description",
        "learningObjectives": ["Learn X", "Implement Y"],
        "complexity": "Beginner",
        "technologies": ["React", "Node.js"]
      }
    ]`;

    const result = await model.generateContent(prompt);
    const projectsText = await result.response.text();

    // Safely extract JSON, removing any code block markers
    const projectsJson = projectsText
      .replace(/^```.*?$/gm, "")
      .replace(/```/g, "")
      .trim();

    // Parse projects
    const projects = JSON.parse(projectsJson);

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Project generation error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate projects",
      },
      { status: 500 },
    );
  }
}
