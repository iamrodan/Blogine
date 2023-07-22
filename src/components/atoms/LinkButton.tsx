import Link from "next/link";

type ButtonProps = {
  label: string;
  url: string;
};

export default function Button({ label, url }: ButtonProps) {
  return (
    <Link href={url}>
      <button
        type="button"
        className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        {label}
      </button>
    </Link>
  );
}
