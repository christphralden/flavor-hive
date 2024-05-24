import Link from "next/link";

export default function Main() {
  return (
    <main className="w-screen h-screen bg-black">
      <Link href={"/login"}>LOGIN PEG</Link>
    </main>
  );
}
