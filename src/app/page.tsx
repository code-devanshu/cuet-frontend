import UploadForm from "@/components/UploadForm";

export default function ScoreCalculatorPage() {
  return (
    <main className="min-h-screen p-6 bg-background text-foreground">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">
          📘 CUET Score Calculator
        </h1>
        <p className="text-center text-muted-foreground max-w-xl mx-auto">
          Upload your OMR response PDFs and correct answer HTML files to
          calculate your category-wise CUET scores instantly.
        </p>
        <UploadForm />
      </div>
    </main>
  );
}
