"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function CompanyPage() {
  const params = useParams();
  const id = params.id as string;

  const [summary, setSummary] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [risk, setRisk] = useState<string | null>(null);
  const [sector, setSector] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const companyWebsite = `https://${id}.com`;

  const handleEnrich = async () => {
    setLoading(true);
    setSummary(null);
    setConfidence(null);
    setRisk(null);
    setSector(null);

    const res = await fetch("/api/enrich", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: companyWebsite }),
    });

    const data = await res.json();

    setSummary(data.summary || "No summary available");
    setConfidence(data.confidence || null);
    setRisk(data.risk || null);
    setSector(data.sector || null);

    setLoading(false);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 capitalize">{id}</h1>
      <p className="text-gray-600 mb-4">{companyWebsite}</p>

      <button
        onClick={handleEnrich}
        className="bg-black text-white px-4 py-2 rounded hover:opacity-80"
      >
        {loading ? "Generating..." : "Enrich with AI"}
      </button>

      {summary && (
        <div className="mt-6 p-6 border rounded-xl shadow-md bg-white">
          
          {sector && (
            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs mb-3">
              {sector}
            </span>
          )}

          <h2 className="font-semibold mb-2">Enrichment Summary:</h2>

          <p className="text-gray-800 whitespace-pre-line">
            {summary}
          </p>

          {confidence && (
            <p className="text-sm text-gray-500 mt-3">
              AI Confidence Score: {confidence}%
            </p>
          )}

          {risk && (
            <p className="text-sm text-red-500 mt-2">
              ⚠ Risk Flag: {risk}
            </p>
          )}

        </div>
      )}
    </div>
  );
}
