import React from 'react';

export default function Footer() {
	return (
		<footer className='w-full h-[400px] flex items-end'>
			<div className="w-fit h-full flex flex-col justify-between  overflow-clip gap-0 p-8">
				<div className='w-full h-full flex flex-col justify-end items-start'>
					<h1 className='text-9xl font-medium text-nowrap leading-[7rem]'>{`FlavorHive `}</h1>
				</div>
				<div className='w-full text-gray-500 text-sm lg:  flex gap-1 justify-between '>
					<p>christphralden</p>
					<p>christophernnh</p>
					<p>Daviskelvin824</p>
					<p>elgankenlie</p>
					<p>josetano2</p>
				</div>
		</div>
		</footer>
	);
}
