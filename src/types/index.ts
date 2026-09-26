export type GradeLevel = "class-10" | "class-12";
export type SourceMode = "ai-archive" | "user-upload";

export interface SubjectInfo {
  id: string;
  name: string;
  code: string;
  grade: GradeLevel;
  totalMarks: number;
  duration: string;
  description: string;
}

export interface ChapterWeightage {
  chapter: string;
  unit: string;
  probability: number; // 0 to 100
  avgMarks: number;
  status: "critical" | "high" | "moderate";
  trendReason: string;
}

export interface PredictedQuestion {
  id: string;
  section: "A" | "B" | "C" | "D" | "E";
  marks: number;
  questionText: string;
  subQuestions?: string[];
  orOption?: string;
  probability: number; // 0 to 100
  topic: string;
  cycleHistory: string; // e.g. "Asked in 2019, 2021, 2023. Skipped in 2024."
  keyMarkingPoints: string[];
  isLocked?: boolean;
}

export interface ExamDataset {
  subject: SubjectInfo;
  yearsAnalyzed: number[];
  totalQuestionsScanned: number;
  chapters: ChapterWeightage[];
  topPredictions: PredictedQuestion[];
  fullPaper: {
    title: string;
    instructions: string[];
    sections: {
      name: string;
      description: string;
      marksPerQuestion: number;
      questions: PredictedQuestion[];
    }[];
  };
}
