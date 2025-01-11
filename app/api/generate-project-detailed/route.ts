// app/api/generate-course/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  try {
    const { courseName } = await request.json();

    if (!courseName) {
      return NextResponse.json(
        { error: "Course name is required" },
        { status: 400 },
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `For the project task: ${courseName}

Generate content in the following strict format:
1. First, create a concise 10-point overview/syllabus in exactly 10 lines
2. Then add a "---" separator
3. Then provide detailed explanations for each of those 10 points, separated by "---"

Ensure:
- First 10 lines are brief, clear task points
- Explanations are comprehensive and actionable, providing step-by-step guidance
- Total content should be professional and structured
- Focus on practical, actionable outcomes
- Please don't add point numbers like 1. 2.`;

    const result = await model.generateContent(prompt);
    const generatedContent = await result.response.text();

    return NextResponse.json({ generatedContent }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
