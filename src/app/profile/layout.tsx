import Navbar from "@components/navbar/navbar";


export default function ProfleLayout({
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
