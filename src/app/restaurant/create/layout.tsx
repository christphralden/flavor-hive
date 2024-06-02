import CreateRestaurantContextProvider from "@context/create-restaurant-context";

export default function CreateRestaurantLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
        <CreateRestaurantContextProvider>
            <div className="h-full w-full flex justify-center items-center">
                <div className="w-1/2 h-full flex justify-start  items-center flex-col gap-16 py-8">
                    {children}
                </div>
            </div>
        </CreateRestaurantContextProvider>
    )
}
