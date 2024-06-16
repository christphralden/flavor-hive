import Footer from "@components/footer/footer";
import Navbar from "@components/navbar/navbar";

export default function FavoritesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen h-full p-8 pt-[100px]">
        {children}
      </div>
      <Footer />
    </>
  );
}
