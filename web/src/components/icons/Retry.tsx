import { useEffect, useRef } from 'react';

export const Retry = ({ isRetrying }: { isRetrying?: boolean }) => {
	const svgRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		if (!svgRef.current) return;
		svgRef.current.style.animation = isRetrying ? 'spin 1s linear forwards infinite' : 'none';
	}, [isRetrying]);

	return (
		<svg
			ref={svgRef}
			style={{ width: 'clamp(16px, 4vw, 18px)', height: 'auto' }}
			viewBox='0 0 18 22'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M9 17C7.325 17 5.90625 16.4187 4.74375 15.2562C3.58125 14.0938 3 12.675 3 11C3 9.325 3.58125 7.90625 4.74375 6.74375C5.90625 5.58125 7.325 5 9 5C9.8625 5 10.6875 5.17812 11.475 5.53437C12.2625 5.89062 12.9375 6.4 13.5 7.0625V5H15V10.25H9.75V8.75H12.9C12.5 8.05 11.9531 7.5 11.2594 7.1C10.5656 6.7 9.8125 6.5 9 6.5C7.75 6.5 6.6875 6.9375 5.8125 7.8125C4.9375 8.6875 4.5 9.75 4.5 11C4.5 12.25 4.9375 13.3125 5.8125 14.1875C6.6875 15.0625 7.75 15.5 9 15.5C9.9625 15.5 10.8313 15.225 11.6063 14.675C12.3813 14.125 12.925 13.4 13.2375 12.5H14.8125C14.4625 13.825 13.75 14.9062 12.675 15.7437C11.6 16.5813 10.375 17 9 17Z'
				fill='#666666'
			/>
		</svg>
	);
};
