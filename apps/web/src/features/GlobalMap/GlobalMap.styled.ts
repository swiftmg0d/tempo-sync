import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { size } from '@/styles';

export const MapContainer = styled.div`
	${size('100%')}

	${({ theme }) => css`
		.maplibregl-ctrl-group {
			background-color: ${theme.colors.bg.white()};
			border-color: ${theme.colors.border.primaryRgb(0.1)};
		}

		.maplibregl-ctrl-group button {
			color: ${theme.colors.text.primary};
		}

		.maplibregl-ctrl-group button + button {
			border-top-color: ${theme.colors.border.primaryRgb(0.1)};
		}

		.maplibregl-ctrl-group button span {
			filter: ${theme.mode === 'dark' ? 'invert(1)' : 'none'};
		}

		.maplibregl-ctrl-scale {
			background-color: ${theme.colors.bg.white(0.7)};
			color: ${theme.colors.text.primary};
			border-color: ${theme.colors.text.secondary};
		}
	`}
`;
