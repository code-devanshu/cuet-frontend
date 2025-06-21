"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import SummaryCards from "./SummaryCard";
import Dropzone from "@/components/Dropzone";
import { SummaryItem, StudentInfo } from "@/types/interface";

const mockApiResponse = {
    student: {
        Name: "Rober William",
        "Application No": "99999999999999",
    },
    summary: [
        {
            Category: "Physics",
            Total: 50,
            Attempted: 44,
            Correct: 39,
            Incorrect: 5,
            "Not Answered": 6,
            Score: 190,
        },
        {
            Category: "Chemistry",
            Total: 50,
            Attempted: 50,
            Correct: 43,
            Incorrect: 7,
            "Not Answered": 0,
            Score: 208,
        },
    ],
};

export default function UploadForm() {
    const [pdfFiles, setPdfFiles] = useState<FileList | null>(null);
    const [htmlFiles, setHtmlFiles] = useState<FileList | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState<number | null>(null);
    const [summary, setSummary] = useState<SummaryItem[]>([]);
    const [student, setStudent] = useState<StudentInfo | null>(null);

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
            setTimeout(() => setProgress(40), 400);
            setTimeout(() => setProgress(70), 800);

            const backendUrl =
                process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

            const res = await axios.post(`${backendUrl}/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("res", res);

            setProgress(100);
            setSummary(res.data.data.summary || []);
            setStudent(res.data.data.student || null);

            toast.success("✅ Scoring complete!", { id: toastId });
        } catch (err) {
            console.error(err);
            toast.error(
                "Something went wrong. Check backend or file formats.",
                {
                    id: toastId,
                }
            );
        } finally {
            setIsUploading(false);
            setTimeout(() => setProgress(null), 1500);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 py-10 px-2 md:px-4">
            <Card className="shadow-md">
                <CardContent className="p-2 md:p-6 space-y-6">
                    <Dropzone
                        label="Upload OMR Response PDFs"
                        accept={{ "application/pdf": [".pdf"] }}
                        onFilesSelected={(files) => setPdfFiles(files)}
                    />

                    <Dropzone
                        label="Upload Correct Answer HTML Files"
                        accept={{ "text/html": [".html"] }}
                        onFilesSelected={(files) => setHtmlFiles(files)}
                    />

                    <div className="my-3">
                        <a
                            href="#faq"
                            className="text-sm text-teal-700 font-semibold underline"
                        >
                            How do I download these files?
                        </a>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <Button
                            onClick={handleUpload}
                            disabled={isUploading}
                            className="w-full md:w-auto"
                        >
                            {isUploading
                                ? "Processing..."
                                : "Upload & Calculate Score"}
                        </Button>

                        {process.env.NODE_ENV === "development" && (
                            <Button
                                type="button"
                                variant="secondary"
                                className="w-full md:w-auto"
                                onClick={() => {
                                    setStudent(mockApiResponse.student);
                                    setSummary(mockApiResponse.summary);
                                }}
                            >
                                Load Sample Data
                            </Button>
                        )}
                    </div>

                    {progress !== null && (
                        <div className="pt-2">
                            <Progress value={progress} className="h-2" />
                        </div>
                    )}
                </CardContent>
            </Card>

            {summary.length > 0 && (
                <div className="space-y-4">
                    {student && (
                        <Card>
                            <CardContent className="p-4 text-sm">
                                <p>
                                    <strong>Name:</strong> {student.Name}
                                </p>
                                <p>
                                    <strong>Application No:</strong>{" "}
                                    {student["Application No"]}
                                </p>
                            </CardContent>
                        </Card>
                    )}
                    <SummaryCards summary={summary} />
                </div>
            )}
        </div>
    );
}
