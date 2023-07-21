import { useRouter } from "next/router";

export default function Home() {
  const { push } = useRouter();
  const isLoggedIn = false;

  if (!isLoggedIn) {
    push("/login");
    return;
  }

  return <main>Home Page</main>;
}
