import Image from "next/image";
import placeholder from '@public/images/pic1.png'

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<div className="w-full h-screen p-8 flex gap-8 justify-center ">
			<section className="w-[65%] h-full bg-black rounded-xl overflow-clip hidden lg:block">
                {/* nanti ganti slider */}
                <Image
                    src={placeholder}
                    alt="placeholder"
                    className="w-full h-full object-cover opacity-[0.75]"
                />
            </section>

			<section className="flex flex-col w-[100%] md:w-[50%] lg:w-[35%] min-w-[350px] h-full lg:pl-4 lg:p-8 py-4 ">
				<div className="w-full h-[10%]">
					<h1 className="text-2xl lg:text-3xl font-medium">FlavorHive</h1>
				</div>
				{children}
			</section>
		</div>
	);
}
