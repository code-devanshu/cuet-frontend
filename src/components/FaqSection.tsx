"use client";


export default function FaqSection() {
  const faqList = [
    {
      question: "📥 Step 1: How do I download my CUET response sheet?",
      plainText:
        "Visit cuet.nta.nic.in, click on 'Display of Recorded Responses and Answer Key', login using Application No. & Password or DOB, and download your response sheet (PDF or HTML).",
      answer: (
        <ol className="list-decimal list-inside space-y-1 pl-4">
          <li>
            Visit{" "}
            <a
              href="https://cuet.nta.nic.in"
              target="_blank"
              className="underline text-primary"
              rel="noopener noreferrer"
            >
              cuet.nta.nic.in
            </a>
          </li>
          <li>Click on “Display of Recorded Responses and Answer Key”</li>
          <li>Login using Application No. & Password or DOB</li>
          <li>Download your response sheet (PDF or HTML)</li>
        </ol>
      ),
    },
    {
      question: "🌐 Step 2: How do I save subject-wise answer key HTMLs?",
      plainText:
        "Open subject-wise link from CUET portal, then save it using: Desktop - Right-click → Save As → Webpage; Android - Tap 3-dots → Share or Save Page; iPhone - Share icon → Save to Files.",
      answer: (
        <div className="space-y-2">
          <p className="text-muted-foreground">
            Repeat for each subject you appeared in:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>Open subject-wise link from CUET portal</li>
            <li>Then save it using:</li>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>
                <strong>Desktop:</strong> Right-click → “Save As…” → Webpage
              </li>
              <li>
                <strong>Android:</strong> Tap 3-dots → Share or Save Page
              </li>
              <li>
                <strong>iPhone:</strong> Share icon → Save to Files
              </li>
            </ul>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <section
      id="faq"
      className="max-w-4xl mx-auto mt-16 px-4 space-y-6 scroll-mt-20"
    >
      <h2 className="text-xl font-semibold text-center text-primary">
        🧾 Need Help? How to Download Files
      </h2>

      <div className="space-y-4">
        {faqList.map((faq, i) => (
          <details
            key={i}
            className="border rounded-md p-4 transition-all group"
            open={i === 0}
          >
            <summary className="font-medium cursor-pointer marker:content-none">
              <span className="group-open:rotate-90 inline-block transition-transform mr-1">
                ▶️
              </span>
              {faq.question}
            </summary>
            <div className="mt-2 text-sm text-muted-foreground">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>

      {/* ✅ JSON-LD for SEO */}
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqList.map((faq) => ({
            "@type": "Question",
            name: faq.question.replace(/^[^a-zA-Z]+/, ""), // remove emoji from beginning
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.plainText,
            },
          })),
        })}
      </script>
    </section>
  );
}
