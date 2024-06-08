import Link from "next/link";

export default function LoginLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
        <>
            <div className="w-full h-fit flex justify-start items-center">
					{children}
            </div>
            <div className="w-full h-[20%] flex justify-start items-end">
					<Link href={'/register'} className="  text-base  text-gray-500 underline">Dont have an account?</Link>
            </div>
        </>
	);
}
