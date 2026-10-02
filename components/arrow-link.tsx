import Link from "next/link";

type ArrowLinkProps = {
  href: string;
  children: React.ReactNode;
  inverse?: boolean;
};

export function ArrowLink({ href, children, inverse = false }: ArrowLinkProps) {
  return (
    <Link className={`arrow-link ${inverse ? "inverse" : ""}`} href={href}>
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
