// The contents of the green logo square: "AI" resting on an open book. Sized in em,
// so it scales with the square's font size.
export default function LogoGlyph() {
  return (
    <span className="flex flex-col items-center leading-none" aria-hidden="true">
      <span>AI</span>
      <svg viewBox="0 0 104 26" className="mt-[0.12em] h-[0.42em] w-[1.6em]" fill="none" stroke="currentColor" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 8c18-4 34-2 48 8 14-10 30-12 48-8" />
      </svg>
    </span>
  );
}
