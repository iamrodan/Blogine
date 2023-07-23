import Link from "next/link";

type ButtonProps = {
  label: string;
  url: string;
  className?: string;
  children?: React.ReactNode;
};

export default function LinkButton({
  label,
  url,
  className,
  children,
}: ButtonProps) {
  const baseClassName =
    "flex justify-center items-center rounded-md uppercase border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black mx-4";

  const finalClassName = `${baseClassName} ${className}`;
  return (
    <Link href={url}>
      <button type="button" className={finalClassName}>
        {label}
        {children && <span className="ms-2">{children}</span>}
      </button>
    </Link>
  );
}
