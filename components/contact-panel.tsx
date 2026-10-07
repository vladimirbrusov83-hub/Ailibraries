import ContactForm from "@/components/contact-form";

const REASONS = [
  "Question about the curriculum",
  "Speaking or workshop inquiry",
  "Collaboration or partnership",
  "Feedback",
];

export default function ContactPanel({
  title,
  intro,
  as: Heading = "h2",
}: {
  title: string;
  intro: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="rv contact-card grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] overflow-hidden bg-white border border-stone-200 rounded-2xl">
      <div className="contact-aside relative p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-stone-200">
        <span className="eyebrow-dash text-xs font-semibold uppercase mb-1.5" style={{ color: "#0F6E56" }}>
          Get in touch
        </span>
        <Heading className="text-2xl sm:text-[28px] sm:leading-[34px] font-bold tracking-[-0.03em] text-stone-900 mb-3">
          {title}
        </Heading>
        <p className="text-stone-500 leading-relaxed mb-7">{intro}</p>
        <ul className="space-y-3">
          {REASONS.map((item, i) => (
            <li key={item} className={`rv w${Math.min(i + 2, 4)} flex items-center gap-3 text-sm text-stone-700`}>
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#E1F5EE", color: "#0F6E56" }}
                aria-hidden="true"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-8 sm:p-10">
        <ContactForm />
      </div>
    </div>
  );
}
