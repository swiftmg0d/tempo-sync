import { useDrag } from '@use-gesture/react';
import { animate, useMotionValue } from 'motion/react';
import { useCallback, useEffect, useRef } from 'react';

import { useUIStore } from '@/store';

const SPRING = { type: 'spring' as const, stiffness: 300, damping: 30 };
const THRESHOLD = 0.3;
const FLICK = 0.5;

/** 70dvh - 7dvh = 63dvh in pixels */
const closedOffset = () => (63 * window.innerHeight) / 100;

const isOpen = () => useUIStore.getState().isSidebarOpen;

export const useSidebarDrag = () => {
	const isSidebarOpen = useUIStore((s) => s.isSidebarOpen);
	const y = useMotionValue(0);
	const targetRef = useRef<HTMLElement>(null);

	// Set initial position + recalculate on resize
	useEffect(() => {
		const sync = () => {
			y.jump(isOpen() ? 0 : closedOffset());
		};
		sync();
		window.addEventListener('resize', sync);
		return () => {
			window.removeEventListener('resize', sync);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const syncPosition = useCallback(() => {
		animate(y, isSidebarOpen ? 0 : closedOffset(), SPRING);
	}, [isSidebarOpen, y]);

	useDrag(
		({ down, movement: [, my], last, velocity: [, vy], direction: [, dy], tap }) => {
			if (tap) return;

			const offset = closedOffset();
			const startY = isOpen() ? 0 : offset;

			if (down && my !== 0) {
				useUIStore.getState().setIsSidebarDragging(true);
				y.set(Math.max(0, Math.min(offset, startY + my)));
			}

			if (last) {
				useUIStore.getState().setIsSidebarDragging(false);

				const shouldOpen =
					vy > FLICK ? dy < 0 : y.get() < offset * (isOpen() ? THRESHOLD : 1 - THRESHOLD);

				animate(y, shouldOpen ? 0 : offset, SPRING);
				useUIStore.getState().setSidebarOpen(shouldOpen);
			}
		},
		{
			axis: 'y',
			filterTaps: true,
			pointer: { touch: true },
			target: targetRef
		}
	);

	return { targetRef, y, syncPosition };
};
