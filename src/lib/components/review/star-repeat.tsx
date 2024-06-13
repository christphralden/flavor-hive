interface StarProps {
	amount: number;
}
export default function StarRepeat({amount}: StarProps) {
	return (
		<div>
			<span className="text-yellow-500">{'★'.repeat(amount)}</span>
			<span className="text-gray-200">{'★'.repeat(Math.abs(amount - 5))}</span>
		</div>
	);
}
