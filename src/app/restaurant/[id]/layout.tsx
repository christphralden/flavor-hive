import Footer from "@components/footer/footer";
import Navbar from "@components/navbar/navbar";

export default function RestaurantDetailLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
        <>
            <Navbar/>
            <div className="w-full h-full p-6 lg:p-8 lg:pt-[100px] pt-[100px] flex flex-col gap-4 lg:gap-8">
                {children}
            </div>
            <Footer/>
        </>
    )
}
 