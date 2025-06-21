import FaqSection from "@/components/FaqSection";
import UploadForm from "@/components/UploadForm";

export const metadata = {
    title: "CUET Score Calculator 2025 – Instant OMR Scoring Tool",
    description:
        "Upload your CUET 2025 OMR response PDF and subject-wise answer key HTML files to get your score instantly. Accurate, simple, and mobile-friendly.",
    keywords: [
        "CUET score calculator",
        "CUET 2025 OMR response",
        "calculate CUET marks",
        "CUET answer key HTML",
        "CUET result tool",
        "CUET PDF scorer",
    ],
    openGraph: {
        title: "CUET Score Calculator 2025",
        description:
            "Instantly calculate your CUET UG 2025 score by uploading your OMR response sheet and answer key HTMLs. Fast and accurate.",
        url: "https://cuet-frontend.vercel.app/",
        siteName: "CUET Score Calculator",
        images: [
            {
                url: "https://cuet-frontend.vercel.app//og-preview.png", // optional preview image
                width: 1200,
                height: 630,
                alt: "CUET Score Calculator Preview",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "CUET Score Calculator 2025",
        description:
            "Get your CUET UG 2025 score instantly by uploading OMR PDF and answer key HTML files.",
        images: ["https://cuet-frontend.vercel.app//og-preview.png"],
    },
};

export default function Home() {
    return (
        <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
            {/* ✅ SEO-Friendly Title and Description */}
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                    CUET Score Calculator 2025
                </h1>
                <p className="text-muted-foreground">
                    Instantly calculate your CUET UG 2025 score by uploading
                    your OMR response sheet and subject-wise answer key HTML
                    files. Simple, accurate, and mobile-friendly.
                </p>
            </div>

            {/* 🚀 Upload Form */}
            <UploadForm />
            <FaqSection />
        </main>
    );
}
