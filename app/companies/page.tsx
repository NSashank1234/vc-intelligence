export default function CompaniesPage() {
  const companies = [
    { id: "stripe", name: "Stripe", industry: "Fintech", website: "https://stripe.com" },
    { id: "notion", name: "Notion", industry: "Productivity", website: "https://notion.so" },
    { id: "openai", name: "OpenAI", industry: "AI", website: "https://openai.com" },
    { id: "figma", name: "Figma", industry: "Design", website: "https://figma.com" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Companies</h1>

      <ul className="space-y-3">
        {companies.map((company) => (
          <li key={company.id}>
            <a
              href={`/companies/${company.id}`}
              className="text-blue-600 underline"
            >
              {company.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
