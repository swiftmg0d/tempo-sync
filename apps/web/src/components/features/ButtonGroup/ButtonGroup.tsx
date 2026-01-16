import { useState } from 'react';

import * as B from './ButtonGroup.styled';
import type { ButtonGroupProps } from './types';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/Button';
export const ButtonGroup = ({ group, onChange, disabled }: ButtonGroupProps) => {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

	return (
		<B.ButtonGroup.Container $disabled={disabled}>
			{group.map(({ id, iconName, text }, index) => {
				const Icon = iconName ? Icons[iconName] : null;
				return (
					<Button
						key={id}
						active={selectedIndex === index}
						style={{ paddingX: 'sm', paddingY: 'sm' }}
						disabled={disabled}
						onClick={() => {
							setSelectedIndex(index === selectedIndex ? selectedIndex : index);
							onChange?.(index === selectedIndex ? selectedIndex : index);
						}}
					>
						{Icon ? <Icon active={selectedIndex === index} /> : null}
						{text ? (
							<>
								<B.ButtonGroup.Label $shownOn='base'>{text.base}</B.ButtonGroup.Label>
								<B.ButtonGroup.Label $shownOn='lg'>{text.lg}</B.ButtonGroup.Label>
							</>
						) : null}
					</Button>
				);
			})}
		</B.ButtonGroup.Container>
	);
};
