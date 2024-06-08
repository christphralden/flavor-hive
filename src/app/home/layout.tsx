import Footer from "@components/footer/footer";
import Navbar from "@components/navbar/navbar";


export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<>
            <Navbar/>
            <div className="w-full h-screen p-6 lg:p-8 lg:pt-[100px] pt-[100px]">
                {children}
            </div>
            <Footer/>
        </>
	);
}
