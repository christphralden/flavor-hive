import Link from "next/link";
import pb from "@/lib/service/pocketbase";

export default function page() {

  return (
    <main className="w-screen h-screen bg-black">
      <div>Niggas</div>
      <Link href="/login">Link to login page</Link>
    </main>
  );
}
