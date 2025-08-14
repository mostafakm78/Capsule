import Link from 'next/link';
import { usePathname } from 'next/navigation';

type HeaderLinkProps = {
  text: string;
  link: string;
};

export default function HeaderLink({ text, link }: HeaderLinkProps) {
  const pathName = usePathname();

  let activeLink = 'font-light';

  if (link === '/' && pathName === '/') {
    activeLink = 'font-medium';
  } else if (link === '/capsules' && pathName === '/capsules') {
    activeLink = 'font-medium';
  } else if (link === '/about-us' && pathName === '/about-us') {
    activeLink = 'font-medium';
  } else if (link === '/contact-us' && pathName === '/contact-us') {
    activeLink = 'font-medium';
  }

  return (
    <Link href={link} className="group relative overflow-hidden hidden md:block h-[1.5em] cursor-pointer">
      <span className={`block relative ${activeLink} text-foreground/80 text-lg transition-transform duration-300 group-hover:-translate-y-full group-hover:text-secondary`}>
        <span className="block">{text}</span>
        <span className="block absolute top-full left-0 w-full">{text}</span>
      </span>
    </Link>
  );
}
