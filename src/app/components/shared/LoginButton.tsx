import Link from 'next/link';
import { CiLogin } from 'react-icons/ci';
import { BsFillPeopleFill } from 'react-icons/bs';

/**
 * LoginButton
 * -------
 * Purpose: Single CTA that routes users to the login/register page.
 * Semantics: <Link> is the correct semantic element for navigation.
 * Accessibility:
 *  - Uses a localized (Persian) aria-label and title for consistent AT experience.
 *  - Icons are decorative; hidden from screen readers with aria-hidden="true".
 *  - The component is fully keyboard-focusable (anchor by default).
 * Responsive:
 *  - Mobile: icon-only.
 *  - Desktop: two visual "chips" for Login/Signup; both navigate to the same /login page.
 */
export default function LoginButton() {
  return (
    <Link
      aria-label="ورود/ثبت‌نام"
      href="/login"
      className="flex text-base items-center lg:bg-transparent bg-primary/70 text-foreground py-1 lg:py-0 px-4 lg:px-0 rounded-md cursor-pointer active:bg-primary active:text-background duration-300"
      // Tooltip for mouse users; non-essential for AT (aria-label already present).
      title="ورود/ثبت‌نام"
    >
      {/* Mobile-only icon: concise visual cue.
          A11y: aria-hidden since the link has a clear accessible name. */}
      <CiLogin className="text-2xl md:text-3xl lg:hidden block" aria-hidden="true" />

      {/* Desktop chip (left): "Login" label + icon.
          Semantics: still part of the same interactive anchor.
          A11y: icon marked aria-hidden; visible text is read by SR. */}
      <span className="lg:inline hidden bg-primary/60 hover:bg-primary text-foreground hover:text-background py-2 px-2 rounded-r-md duration-300">
        <span>ورود</span>
        <CiLogin className="inline mr-2" aria-hidden="true" />
      </span>

      {/* Desktop chip (right): "Sign up" label + icon.
          UX: indicates both login and registration are reachable at /login.
          A11y: icon marked aria-hidden to avoid redundant announcement. */}
      <span className="lg:inline hidden bg-primary hover:bg-primary text-foreground hover:text-background py-2 px-2 rounded-l-md duration-300">
        <span>ثبت نام</span>
        <BsFillPeopleFill className="inline mr-2" aria-hidden="true" />
      </span>
    </Link>
  );
}
