import Navbar from "@components/navbar/navbar";


export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<>
            <Navbar/>
            <div className="w-full h-screen p-8 pt-[100px]">
                {children}
            </div>
        </>
	);
}
