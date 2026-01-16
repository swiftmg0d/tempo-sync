import { MobileOnly } from '@/styles';
import * as B from './BrandHeader.styled';
import { Icons } from '@/components/icons';

import { useActivityCardsStore } from '@/state';
import { showWhen } from '@/utils';
import { Queries } from '@/hooks/quieries';

export const BrandHeader = () => {
	const isEmpty = useActivityCardsStore((state) => state.isEmpty);
	const { isLoading } = Queries.useSyncStatus();

	const [LogoIcon, HamburgerIcon, SignalFlowIcon] = [Icons.logo, Icons.hamburger, Icons.signalFlow];

	return (
		<B.BrandHeader.Container>
			<B.BrandHeader.LogoContainer>
				<MobileOnly>
					<HamburgerIcon />
				</MobileOnly>
				<LogoIcon />
				<B.BrandHeader.Title>TempoSync</B.BrandHeader.Title>
				<B.BrandHeader.SyncContainer>
					{showWhen(
						!isEmpty,
						<MobileOnly>
							<SignalFlowIcon />
						</MobileOnly>
					)}
					<B.BrandHeader.SyncInfo isLoading={isLoading}>Synced</B.BrandHeader.SyncInfo>
					<B.BrandHeader.PulseWave isLoading={isLoading} $disabled={!!isEmpty} />
					{showWhen(!!isEmpty, <B.BrandHeader.SyncInfoEmpty>Offline</B.BrandHeader.SyncInfoEmpty>)}
				</B.BrandHeader.SyncContainer>
			</B.BrandHeader.LogoContainer>
			<B.BrandHeader.Description>Recent Analyses</B.BrandHeader.Description>
		</B.BrandHeader.Container>
	);
};
