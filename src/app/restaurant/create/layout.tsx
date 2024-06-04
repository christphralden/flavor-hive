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
            <div className="flex-1 h-screen w-full flex justify-center items-center p-8 pt-[100px]">
                <div className="w-full lg:w-[75%] xl:w-1/2 h-full flex justify-start  items-center flex-col gap-16 py-8">
                    {children}
                </div>
            </div>
        </CreateRestaurantContextProvider>
        </>
    )
}
