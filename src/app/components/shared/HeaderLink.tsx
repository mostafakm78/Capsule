import Link from 'next/link';
import { usePathname } from 'next/navigation';

type HeaderLinkProps = {
  text: string; // Visible label used as the accessible name (Persian)
  link: string; // Target href for this nav item
};

export default function HeaderLink({ text, link }: HeaderLinkProps) {
  const pathName = usePathname(); // Read current route to compute active state

  // Visual weight class for the link (kept exactly as-is; style not changed)
  let activeLink = 'font-light';

  // Compute "active" state for known routes (visual only)
  if (link === '/' && pathName === '/') {
    activeLink = 'font-medium';
  } else if (link === '/capsules' && pathName.startsWith('/capsules')) {
    activeLink = 'font-medium';
  } else if (link === '/about-us' && pathName === '/about-us') {
    activeLink = 'font-medium';
  } else if (link === '/contact-us' && pathName === '/contact-us') {
    activeLink = 'font-medium';
  }

  // Semantics: determine whether this item represents the current page
  const isCurrent = (link === '/' && pathName === '/') || (link === '/capsules' && pathName.startsWith('/capsules')) || (link === '/about-us' && pathName === '/about-us') || (link === '/contact-us' && pathName === '/contact-us');

  return (
    <Link aria-label={text} aria-current={isCurrent ? 'page' : undefined} href={link} className="group relative overflow-hidden hidden md:block h-[1.5em] cursor-pointer" title={text}>
      {/* Animated label wrapper; keeps original classes and transition behavior */}
      <span className={`block relative ${activeLink} text-foreground/80 text-lg transition-transform duration-300 group-hover:-translate-y-full group-hover:text-secondary`}>
        {/* Primary, accessible text node (read by screen readers) */}
        <span className="block">{text}</span>

        {/* Duplicate label used only for the hover slide animation.
            Hidden from assistive tech to prevent double announcement. */}
        <span className="block absolute top-full left-0 w-full" aria-hidden="true">
          {text}
        </span>
      </span>
    </Link>
  );
}
