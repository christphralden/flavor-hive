import Link from "next/link";

export default function RegisterLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
        <>
            <div className="w-full h-[80%] flex justify-start items-center">
					{children}
            </div>
            <div className="w-full h-[10%] flex justify-start items-end">
					<Link href={'/login'} className="text-base text-gray-500 underline">Already have an account?</Link>
            </div>
        </>
	);
}
