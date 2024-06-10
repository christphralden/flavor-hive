'use client';
import * as React from 'react';

import {cn} from '@utils/utils';

export interface InputLabelledProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	children?: React.ReactNode;
}

const InputLabelled = React.forwardRef<HTMLInputElement, InputLabelledProps>(
	({className, type, label, children, ...props}, ref) => {
		return (
			<div className={cn("flex flex-col gap-1 w-full",className)}>
				<div className="flex gap-2 items-baseline justify-between">
					<p className="font-normal text-sm">{label}</p>
					<div className="text-gray-500 text-sm  ">{children}</div>
				</div>
				<input
					type={type}
					className={
						'flex w-full rounded-md border border-input bg-background p-3  text-base file:border-0 file:bg-transparent file:font-medium focus-visible:outline-none outline-gray-500 focus-visible:ring-0 focus-visible:ring-transparent disabled:cursor-not-allowed disabled:opacity-50'}
					ref={ref}
					{...props}
				/>
			</div>
		);
	}
);
InputLabelled.displayName = 'InputLabelled';

export {InputLabelled};
