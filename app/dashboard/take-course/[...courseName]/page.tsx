// pages/app/dashboard/take-course/[...courseName]/index.tsx
"use client";
import { useParams } from 'next/navigation'
import { useState } from "react";

export default function TakeCoursePage(){
  const router = useParams();
  const { courseName } = router; // Extract course name from route
  console.log(courseName);
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);

  const handleGenerateCourse = async () => {
    if (!courseName || !Array.isArray(courseName)) {
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
        body: JSON.stringify(courseName[0]),
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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Take Course: {courseName || "Loading..."}</h1>

      <button
        onClick={handleGenerateCourse}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: loading ? "#ccc" : "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate Course"}
      </button>

      {generatedContent && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd" }}>
          <h2>Generated Content</h2>
          <p>{generatedContent}</p>
        </div>
      )}
    </div>
  );
};

