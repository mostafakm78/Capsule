export default function Loadings() {
  return (
    // Component: full-screen loading overlay; keeps UI visible behind a blurred backdrop
    // Accessibility: uses role="status" + aria-live="polite" so screen readers announce updates non-intrusively
    // aria-busy="true" signals ongoing work; localized label describes the status in Persian
    <section className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/60 backdrop-blur" aria-live="polite" aria-busy="true" role="status" aria-label="وضعیت بارگذاری">
      {/* Group: centers spinner and message as a single visual unit */}
      {/* Semantics: <figure>/<figcaption> pairs the graphic (spinner) with its caption */}
      <figure className="flex flex-col items-center gap-3">
        {/* SR text: guaranteed announcement even if visible caption is altered by future styles */}
        <span className="sr-only">در حال بارگذاری...</span>

        {/* Spinner: purely decorative; hidden from assistive tech to avoid redundant announcements */}
        <svg className="h-8 w-8 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>

        {/* Caption: visible text that conveys the loading status; localized Persian content */}
        <figcaption className="text-sm text-muted-foreground">در حال بارگذاری...</figcaption>
      </figure>
    </section>
  );
}
