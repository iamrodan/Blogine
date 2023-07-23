type NavItemProps = {
  name: string;
  href: string;
};

export default function NavItem({ name, href }: NavItemProps) {
  return (
    <a
      href={href}
      className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
    >
      {name}
    </a>
  );
}
