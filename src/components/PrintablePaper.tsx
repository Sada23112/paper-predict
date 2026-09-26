"use client";

import React from "react";
import { ExamDataset } from "@/types";
import { Printer, X } from "lucide-react";

interface PrintablePaperProps {
  data: ExamDataset;
  onClose: () => void;
}

export const PrintablePaper: React.FC<PrintablePaperProps> = ({ data, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/80 backdrop-blur-sm p-4 sm:p-6 flex justify-center">
      <div className="relative w-full max-w-4xl bg-white text-black p-6 sm:p-12 shadow-2xl rounded-xl my-auto print:m-0 print:p-0 print:shadow-none print:w-full">
        {/* Floating Action Controls (Hidden when printing) */}
        <div className="no-print mb-6 flex items-center justify-between border-b pb-4">
          <div className="text-xs text-zinc-500">
            Previewing Printable A4 Layout (Tip: In print dialog, choose &quot;Save as PDF&quot;)
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-xs font-bold text-white hover:bg-orange-700 transition"
            >
              <Printer className="h-4 w-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-lg border border-zinc-200 p-2 text-zinc-600 hover:bg-zinc-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable Examination Paper Header */}
        <div className="border-b-2 border-black pb-4 text-center font-serif">
          <div className="flex justify-between items-start text-xs border border-black p-2 mb-4 font-mono">
            <div>
              <span>Roll No: </span>
              <span className="border-b border-dotted border-black inline-block w-48"></span>
            </div>
            <div className="font-bold">
              <span>SET-A (PREDICTED 2026)</span>
            </div>
          </div>

          <div className="text-xs uppercase tracking-widest font-sans font-bold text-zinc-600">
            PaperPredict AI Model Examination
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold uppercase mt-1 tracking-tight">
            {data.fullPaper.title}
          </h1>

          <div className="mt-4 flex justify-between text-xs sm:text-sm font-bold border-t border-b border-black py-1.5 font-sans">
            <span>Time Allowed: {data.subject.duration}</span>
            <span>Subject Code: {data.subject.code}</span>
            <span>Maximum Marks: {data.subject.totalMarks}</span>
          </div>
        </div>

        {/* General Instructions */}
        <div className="mt-4 text-xs font-serif leading-relaxed border-b border-zinc-300 pb-4">
          <p className="font-bold mb-1">General Instructions:</p>
          <ol className="list-decimal list-inside space-y-0.5">
            {data.fullPaper.instructions.map((inst, idx) => (
              <li key={idx}>{inst}</li>
            ))}
            <li>Use of calculators is NOT permitted in the examination.</li>
          </ol>
        </div>

        {/* Sections and Questions */}
        <div className="mt-6 space-y-6 font-serif">
          {data.fullPaper.sections.map((sec, sIdx) => (
            <div key={sIdx} className="space-y-4">
              <div className="border-b border-black pb-1 text-center font-sans">
                <span className="font-bold text-sm uppercase tracking-wide">{sec.name}</span>
                <span className="text-xs block text-zinc-600">{sec.description}</span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
                {sec.questions.map((q, qIdx) => (
                  <div key={q.id} className="flex justify-between items-start gap-4">
                    <span className="font-bold shrink-0 font-sans">Q{qIdx + 1}.</span>
                    <div className="flex-1 whitespace-pre-line">
                      <p>{q.questionText}</p>
                      {q.orOption && (
                        <div className="mt-2 pl-4 border-l-2 border-zinc-400 italic">
                          <span className="font-bold font-sans not-italic block text-[11px]">OR</span>
                          {q.orOption}
                        </div>
                      )}
                    </div>
                    <span className="font-bold shrink-0 font-sans">[{q.marks}]</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Paper End Mark */}
        <div className="mt-12 text-center text-xs font-mono border-t border-black pt-4 font-bold">
          *** END OF PREDICTED QUESTION PAPER ***
        </div>
      </div>
    </div>
  );
};
