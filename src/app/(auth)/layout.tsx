export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
        //ngefek ke login&register
        <div>
            {children}
        </div>
    )
}
