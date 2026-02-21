export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    // Simulate AI delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const companyName = new URL(url).hostname.replace("www.", "");

    // Dynamic sector detection
    let sector = "Technology";

    if (companyName.includes("stripe")) sector = "Fintech";
    if (companyName.includes("notion")) sector = "Productivity";
    if (companyName.includes("openai")) sector = "Artificial Intelligence";

    // Generate VC-style summary
    const summary = `
${companyName} appears to be a high-growth company operating within the ${sector} sector.
The business demonstrates scalable infrastructure and recurring revenue potential.
Its positioning suggests defensible competitive advantages and strong market expansion opportunities.
From a VC perspective, it represents an attractive long-term investment opportunity.
`;

    // Risk flags
    const risks = [
      "High competition in sector",
      "Regulatory exposure risk",
      "Dependence on external integrations",
      "Customer concentration risk"
    ];

    return Response.json({
      summary,
      confidence: Math.floor(Math.random() * 20) + 80, // 80–99%
      risk: risks[Math.floor(Math.random() * risks.length)],
      sector
    });

  } catch (error) {
    return Response.json({
      summary: "Something went wrong",
      confidence: null,
      risk: null,
      sector: null
    });
  }
}
