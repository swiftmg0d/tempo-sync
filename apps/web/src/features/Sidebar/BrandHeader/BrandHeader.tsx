import { useShallow } from 'zustand/shallow';

import * as B from './BrandHeader.styled';

import { Icons } from '@/components/icons';
import { Queries } from '@/hooks/quieries';
import { useActivityCardsStore, useUIStore } from '@/store';
import { MobileOnly } from '@/styles';
import { showWhen } from '@/utils';

export const BrandHeader = () => {
	const isEmpty = useActivityCardsStore((state) => state.isEmpty);
	const { isLoading } = Queries.useSyncStatus();
	const { toggleSidebar, isSidebarOpen } = useUIStore(
		useShallow((state) => ({
			toggleSidebar: state.toggleSidebar,
			isSidebarOpen: state.isSidebarOpen
		}))
	);

	const [LogoIcon, HamburgerIcon, SignalFlowIcon] = [Icons.logo, Icons.hamburger, Icons.signalFlow];

	return (
		<B.BrandHeader.Container>
			<B.BrandHeader.LogoContainer>
				<MobileOnly
					onClick={isSidebarOpen ? undefined : toggleSidebar}
					style={{ cursor: isSidebarOpen ? 'default' : 'pointer' }}
				>
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
					{showWhen(
						!isEmpty,
						<B.BrandHeader.SyncInfo isLoading={isLoading}>
							{isEmpty ? 'Not Synced' : isLoading ? 'Syncing...' : 'Synced'}
						</B.BrandHeader.SyncInfo>
					)}

					<B.BrandHeader.PulseWave isLoading={isLoading} $disabled={!!isEmpty} />
					{showWhen(!!isEmpty, <B.BrandHeader.SyncInfoEmpty>Offline</B.BrandHeader.SyncInfoEmpty>)}
				</B.BrandHeader.SyncContainer>
			</B.BrandHeader.LogoContainer>
			<B.BrandHeader.Description>Recent Analyses</B.BrandHeader.Description>
		</B.BrandHeader.Container>
	);
};
