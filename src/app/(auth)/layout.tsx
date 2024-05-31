import Image from "next/image";
import placeholder from '@public/images/pic1.jpg'

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="w-screen h-screen p-4 flex gap-8">
			<div className="w-[65%] h-full bg-black rounded-lg overflow-clip">
                {/* nanti ganti slider */}
                <Image
                    src={placeholder}
                    alt="placeholder"
                    className="w-full h-full object-cover opacity-[0.5]"
                />
            </div>

			<div className="flex flex-col w-[35%] h-full  px-8 py-4">
				<div className="w-full h-[10%]">
					<h1 className="text-3xl font-medium">FlavorHive</h1>
				</div>
				<div className="w-full h-[80%] flex justify-start items-center">{children}</div>
				<div className="w-full h-[10%] flex justify-start items-end">
					<h1 className="text-base text-gray-500">Need Help?</h1>
				</div>
			</div>
		</div>
	);
}
