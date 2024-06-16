import Footer from "@components/footer/footer";
import Navbar from "@components/navbar/navbar";

export default function ExploreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="w-full h-screen p-8 pt-[100px]">{children}</div>
      {/* <Footer /> */}
    </>
  );
}
