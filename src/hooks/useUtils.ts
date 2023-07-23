import { useRouter } from "next/router";

export default function useUtils() {
  const router = useRouter();
  const goToHome = () => router.replace("/");
  return { goToHome };
}
