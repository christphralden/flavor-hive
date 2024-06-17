import Footer from "@components/footer/footer";
import Navbar from "@components/navbar/navbar";
import HomeHeader from "./_components/home-header";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="w-full gap-8 lg:gap-16 flex flex-col min-h-screen h-full p-6 lg:p-8 lg:pt-[100px] pt-[100px]">
        <HomeHeader />
        {children}
      </div>
      <Footer />
    </>
  );
}
