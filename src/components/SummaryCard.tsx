"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const categoryBadges: Record<string, { icon: string; color: string }> = {
  Physics: { icon: "🧲", color: "bg-blue-100 text-blue-800" },
  Chemistry: { icon: "⚗️", color: "bg-yellow-100 text-yellow-800" },
  Biology: { icon: "🧬", color: "bg-green-100 text-green-800" },
  English: { icon: "📖", color: "bg-purple-100 text-purple-800" },
  General: { icon: "📘", color: "bg-gray-100 text-gray-800" },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SummaryCards({ summary }: { summary: any[] }) {
  if (!summary || summary.length === 0) return null;

  const totalStats = summary.reduce(
    (acc, curr) => {
      acc.total += curr.Total;
      acc.attempted += curr.Attempted;
      acc.correct += curr.Correct;
      acc.incorrect += curr.Incorrect;
      return acc;
    },
    { total: 0, attempted: 0, correct: 0, incorrect: 0 }
  );

  const totalScore = totalStats.correct * 5 - totalStats.incorrect;

  return (
    <div className="space-y-6 mt-6">
      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="bg-primary/10 border border-primary shadow-md">
          <CardHeader>
            <CardTitle className="text-primary text-xl font-bold">
              🎯 Overall Score
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>🧮 Total Questions:</strong> {totalStats.total}
            </div>
            <div>
              <strong>✏️ Attempted:</strong> {totalStats.attempted}
            </div>
            <div>
              <strong>✅ Correct:</strong> {totalStats.correct}
            </div>
            <div>
              <strong>❌ Incorrect:</strong> {totalStats.incorrect}
            </div>
            <div className="md:col-span-3 text-base font-medium text-primary">
              ✅ Final Score: {totalScore} / {totalStats.total * 5}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Subject-wise Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {summary.map((item, index) => {
          const category = item.Category || "General";
          const badge = categoryBadges[category] || {
            icon: "❓",
            color: "bg-red-100 text-red-800",
          };
          const subjectScore = item.Correct * 5 - item.Incorrect;
          const maxScore = item.Total * 5;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base font-semibold text-primary">
                    {badge.icon} {category}
                  </CardTitle>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${badge.color}`}
                  >
                    {category}
                  </span>
                </CardHeader>
                <CardContent className="space-y-1 text-sm">
                  <p>
                    <strong>🧮 Total:</strong> {item.Total}
                  </p>
                  <p>
                    <strong>✏️ Attempted:</strong> {item.Attempted}
                  </p>
                  <p>
                    <strong>✅ Correct:</strong> {item.Correct}
                  </p>
                  <p>
                    <strong>❌ Incorrect:</strong> {item.Incorrect}
                  </p>
                  <p>
                    <strong>🚫 Not Answered:</strong> {item["Not Answered"]}
                  </p>
                  <p className="text-sm font-medium text-primary">
                    🎓 Score: {subjectScore} / {maxScore}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
