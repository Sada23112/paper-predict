import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { ExamDataset } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subjectName, grade, customNotes, filesCount } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `
You are a Senior CBSE Examination Controller and Educational Statistician.
Analyze the following subject: ${subjectName} for ${grade}.
The user has uploaded ${filesCount || 3} custom question papers/pre-boards with notes: "${customNotes || "Standard CBSE Past 5 Years Papers"}".

Identify:
1. High-probability topics based on alternating 2-year repetition patterns and official CBSE marking blueprints.
2. Top 5 predicted questions with realistic probability scores (between 78% and 96%), section, marks, cycle history explanation, and official marking scheme hints.
3. Chapter recurrence weightage.

Return ONLY a valid JSON object matching this structure (no markdown fences, just pure JSON):
{
  "subject": {
    "id": "custom-${subjectName.toLowerCase().replace(/\\s+/g, "-")}",
    "name": "${subjectName}",
    "code": "CUSTOM",
    "grade": "${grade}",
    "totalMarks": 80,
    "duration": "3 Hours",
    "description": "AI-analyzed custom question papers dataset for ${subjectName}."
  },
  "yearsAnalyzed": [2019, 2020, 2021, 2022, 2023, 2024],
  "totalQuestionsScanned": 175,
  "chapters": [
    {
      "chapter": "Top Unit Name",
      "unit": "Core Unit",
      "probability": 94,
      "avgMarks": 12,
      "status": "critical",
      "trendReason": "Consistent 2-year recurrence detected in uploaded papers."
    }
  ],
  "topPredictions": [
    {
      "id": "custom-pred-1",
      "section": "D",
      "marks": 5,
      "topic": "Core Topic",
      "questionText": "Predicted comprehensive question text with subparts (a) and (b)...",
      "orOption": "Alternative predicted variant...",
      "probability": 93,
      "cycleHistory": "Asked in alternate years across uploaded pre-board papers.",
      "keyMarkingPoints": ["Step 1 with mark allocation", "Step 2 with mark allocation"],
      "isLocked": false
    }
  ],
  "fullPaper": {
    "title": "CBSE ${grade.toUpperCase()} PREDICTED PAPER 2026 - ${subjectName.toUpperCase()}",
    "instructions": [
      "This question paper consists of 38 questions in 5 sections.",
      "Section A consists of 20 objective questions (1 mark each).",
      "Section B consists of 5 Short Answer questions (2 marks each).",
      "Section C consists of 6 Short Answer questions (3 marks each).",
      "Section D consists of 4 Long Answer questions (5 marks each).",
      "Section E consists of 3 Case-Based questions (4 marks each)."
    ],
    "sections": [
      {
        "name": "Section A (Objective)",
        "description": "1 Mark each",
        "marksPerQuestion": 1,
        "questions": [
          {
            "id": "c-sec-a-1",
            "section": "A",
            "marks": 1,
            "topic": "Fundamentals",
            "questionText": "Sample MCQ question based on uploaded patterns?",
            "probability": 91,
            "cycleHistory": "Staple conceptual question.",
            "keyMarkingPoints": ["Correct Option"],
            "isLocked": false
          }
        ]
      }
    ]
  }
}
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      const responseText = response.text?.trim() || "";
      const parsedData: ExamDataset = JSON.parse(responseText);

      return NextResponse.json({
        success: true,
        source: "gemini-live",
        data: parsedData,
      });
    }

    // Fallback if GEMINI_API_KEY is not configured
    return NextResponse.json({
      success: true,
      source: "simulated-engine",
      message: "Set GEMINI_API_KEY in .env.local to enable live model queries.",
    });
  } catch (error: unknown) {
    console.error("Error in /api/analyze-papers:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to analyze question papers",
      },
      { status: 500 }
    );
  }
}
