import Link from "next/link";
import Image from "../atoms/Image";

export default function AppLogo() {
  return (
    <Link href="/">
      <Image
        src="/images/blogine-logo.svg"
        alt="blogine app logo"
        className="h-10"
      />
    </Link>
  );
}
