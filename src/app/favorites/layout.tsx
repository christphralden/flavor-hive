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
      <div className="w-full min-h-screen flex flex-col gap-16 h-full p-8 pt-[100px]">
        <div className="w-full flex flex-col items-center justify-center gap-2 h-48">
          <h1 className="text-3xl font-medium ">Your favorite picks</h1>
          <p className="text-gray-500 text-sm lg:text-base">
            Discover and revisit your favorite dishes and restaurant, all in one
            place
          </p>
        </div>
        {children}
      </div>
      <Footer />
    </>
  );
}
