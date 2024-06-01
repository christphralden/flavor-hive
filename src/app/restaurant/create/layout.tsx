
export default function CreateRestaurantLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
        <div className="h-full w-full flex justify-start  items-center flex-col gap-16 py-8">
            {children}
        </div>
    )
}
