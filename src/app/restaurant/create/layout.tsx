import Footer from "@components/footer/footer";
import Navbar from "@components/navbar/navbar";
import CreateRestaurantContextProvider from "@context/create-restaurant-context";

export default function CreateRestaurantLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
        <>
        <Navbar/>
        <CreateRestaurantContextProvider>
            <div className="lg:h-[100dvh] h-[100dvh] flex-grow min-h-screen w-full flex justify-center items-center p-6 lg:p-8 lg:pt-[100px] pt-[100px]">
                <div className="w-full lg:w-[75%] xl:w-1/2 h-full flex justify-start  items-center flex-col gap-4 lg:gap-16 py-4">
                    {children}
                </div>
            </div>
        </CreateRestaurantContextProvider>
        {/* <Footer/> */}
        </>
    )
}
