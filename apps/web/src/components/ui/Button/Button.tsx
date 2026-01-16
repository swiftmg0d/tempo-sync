import { StyledButton } from './Button.styled';
import type { ButtonProps } from './types';

export const Button = ({
	children,
	style = {},
	active,
	onClick,
	variant = 'transparent',
	disabled
}: ButtonProps) => {
	return (
		<StyledButton
			disabled={disabled}
			$disabled={disabled}
			$variant={variant}
			$width={style.width}
			$height={style.height}
			$paddingX={style.paddingX}
			$paddingY={style.paddingY}
			$active={active}
			onClick={onClick}
		>
			{children}
		</StyledButton>
	);
};
