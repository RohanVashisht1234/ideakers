// pages/api/generate-course.ts

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { courseName } = req.body;

  if (!courseName) {
    return res.status(400).json({ error: "Course name is required" });
  }

  try {
    // Replace this with actual Gemini API logic
    const response = await fetch("https://gemini-api.example.com/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseName }),
    });

    if (!response.ok) throw new Error("Failed to fetch from Gemini API");

    const data = await response.json();

    res.status(200).json({ generatedContent: data.generatedContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
