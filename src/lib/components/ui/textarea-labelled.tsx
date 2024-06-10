import * as React from 'react';

import {cn} from '@utils/utils';

export interface TextAreaLabelledProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string;
	children?: React.ReactNode;
}

const TextareaLabelled = React.forwardRef<HTMLTextAreaElement, TextAreaLabelledProps>(
	({className, label, children, ...props}, ref) => {
		return (
			<div className="flex flex-col gap-1">
				<div className="flex gap-2 items-baseline justify-between">
					<p className="font-normal  text-sm ">{label}</p>
					<div className="text-gray-500 text-sm   ">{children}</div>
				</div>
				<textarea
					className={cn(
						'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2   text-base  focus-visible:outline-none outline-gray-500 focus-visible:ring-0 focus-visible:ring-transparent disabled:cursor-not-allowed disabled:opacity-50',
						className
					)}
					ref={ref}
					{...props}
				/>
			</div>
		);
	}
);
TextareaLabelled.displayName = 'TextareaLabelled';

export {TextareaLabelled};
