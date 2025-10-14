import { requireAuth } from "@/lib/auth/auth-utils";

export default async function Home() {
  await requireAuth();

  return <div></div>;
}
