"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import SummaryCards from "./SummaryCard";

export default function UploadForm() {
  const [pdfFiles, setPdfFiles] = useState<FileList | null>(null);
  const [htmlFiles, setHtmlFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [summary, setSummary] = useState<any[]>([]);

  const handleUpload = async () => {
    if (!pdfFiles || !htmlFiles) {
      toast.error("Please upload both PDF and HTML files");
      return;
    }

    const formData = new FormData();
    Array.from(pdfFiles).forEach((file) =>
      formData.append("response_pdfs", file)
    );
    Array.from(htmlFiles).forEach((file) =>
      formData.append("html_files", file)
    );

    const toastId = toast.loading("Uploading and processing...");
    setProgress(10);
    setIsUploading(true);

    try {
      // Simulate progress
      setTimeout(() => setProgress(40), 500);
      setTimeout(() => setProgress(70), 1000);

      const res = await axios.post("http://localhost:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProgress(100);
      setSummary(res.data.summary || []);
      toast.success("✅ Scoring complete!", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Check backend or file formats.", {
        id: toastId,
      });
    } finally {
      setIsUploading(false);
      setTimeout(() => setProgress(null), 1500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-10 px-4">
      <Card className="shadow-md">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="pdf-upload">Upload OMR Response PDFs</Label>
            <Input
              id="pdf-upload"
              type="file"
              accept=".pdf"
              multiple
              onChange={(e) => setPdfFiles(e.target.files)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="html-upload">
              Upload Correct Answer HTML Files
            </Label>
            <Input
              id="html-upload"
              type="file"
              accept=".html"
              multiple
              onChange={(e) => setHtmlFiles(e.target.files)}
            />
          </div>

          <Button onClick={handleUpload} disabled={isUploading}>
            {isUploading ? "Processing..." : "Upload & Calculate Score"}
          </Button>

          {progress !== null && (
            <div className="pt-2">
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {summary.length > 0 && <SummaryCards summary={summary} />}
    </div>
  );
}
