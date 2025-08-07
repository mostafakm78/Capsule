import Link from "next/link";

type HeaderLinkProps = {
    text : string
    link : string
}

export default function HeaderLink({text , link} : HeaderLinkProps) {
  return (
    <Link href={link} className="group relative overflow-hidden hidden md:block h-[1.5em] cursor-pointer">
      <span className="block relative text-foreground/80 text-lg transition-transform duration-300 group-hover:-translate-y-full group-hover:text-secondary">
        <span className="block">{text}</span>
        <span className="block absolute top-full left-0 w-full">{text}</span>
      </span>
    </Link>
  );
}
