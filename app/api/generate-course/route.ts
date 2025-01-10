// app/api/generate-course/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  try {
    const { courseName } = await request.json();

    if (!courseName) {
      return NextResponse.json({ error: "Course name is required" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Create a comprehensive, professional course outline for: ${courseName}. 
    Provide a detailed structure including:
    - Comprehensive course description
    - Detailed learning objectives
    - Curriculum breakdown with modules and topics
    - Recommended learning resources
    - Potential hands-on projects or assignments
    - Estimated course duration
    
    Format the response in a clear, professional manner, suitable for a comprehensive educational program.`;

    const result = await model.generateContent(prompt);
    const generatedContent = await result.response.text();

    return NextResponse.json({ generatedContent }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
