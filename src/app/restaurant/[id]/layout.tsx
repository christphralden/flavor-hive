import Navbar from "@components/navbar/navbar";

export default function RestaurantDetailLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
        <>
            <Navbar/>
            <div className="w-full h-full p-8 pt-[100px] flex flex-col gap-8">
                {children}
            </div>
        </>
    )
}
