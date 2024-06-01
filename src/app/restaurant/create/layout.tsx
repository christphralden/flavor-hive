
export default function CreateRestaurantLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
        <div className="h-full w-full flex justify-center items-center flex-col gap-8">
            {children}
        </div>
    )
}
