export const HeadphoneSync = () => {
	return (
		<svg
			width='200'
			height='200'
			viewBox='0 0 200 200'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<circle cx='100' cy='100' r='40' stroke='#008080' strokeWidth='2' opacity='0.4'>
				<animate attributeName='r' from='40' to='80' dur='2s' begin='0s' repeatCount='indefinite' />
				<animate
					attributeName='opacity'
					from='0.4'
					to='0'
					dur='2s'
					begin='0s'
					repeatCount='indefinite'
				/>
			</circle>
			<circle cx='100' cy='100' r='40' stroke='#008080' strokeWidth='2' opacity='0.4'>
				<animate
					attributeName='r'
					from='40'
					to='80'
					dur='2s'
					begin='0.6s'
					repeatCount='indefinite'
				/>
				<animate
					attributeName='opacity'
					from='0.4'
					to='0'
					dur='2s'
					begin='0.6s'
					repeatCount='indefinite'
				/>
			</circle>

			<g transform='translate(53, 70)'>
				<path
					d='M48 10C35.85 10 26 19.85 26 32V42C26 44.21 27.79 46 30 46H34V32H28V32C28 20.95 36.95 12 48 12C59.05 12 68 20.95 68 32V32H62V46H66C68.21 46 70 44.21 70 42V32C70 19.85 60.15 10 48 10Z'
					fill='none'
					stroke='#008080'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='2.5'
				/>
				<path d='M34 32V46M62 32V46' stroke='#008080' strokeLinecap='round' strokeWidth='2.5' />
			</g>

			<text
				x='50%'
				y='170'
				textAnchor='middle'
				fill='#666666'
				fontFamily='Inter, system-ui'
				fontSize='12px'
			>
				Rythnm Not Yet In Sync
			</text>
		</svg>
	);
};
