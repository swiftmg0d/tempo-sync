import { CalorieBurnIcon } from './CalorieBurn';
import { DistanceIcon } from './Distance';
import { FlagIcon } from './Flag';
import { Globe } from './Globe';
import { Grid } from './Grid';
import { Hamburger } from './Hamburger';
import { HeadphoneSync } from './HeadPhoneSync';
import { HeadphoneIcon } from './Headphone';
import { HeartIcon } from './Heart';
import { HistoryIcon } from './History';
import { Logo } from './Logo';
import { MapIcon } from './Map';
import { PaceIcon } from './Pace';
import { Retry } from './Retry';
import { Runner } from './Runner';
import { SignalFlow } from './SignalFlow';
import { SpotifyIcon } from './Spotify';
import { StravaIcon } from './Strava';
import { TrendingUp } from './TrendingUp';

export const Icons = {
	globe: Globe,
	grid: Grid,
	logo: Logo,
	runner: Runner,
	trendingUp: TrendingUp,
	retry: Retry,
	hamburger: Hamburger,
	signalFlow: SignalFlow,
	distance: DistanceIcon,
	calorieBurn: CalorieBurnIcon,
	heart: HeartIcon,
	pace: PaceIcon,
	history: HistoryIcon,
	map: MapIcon,
	headphone: HeadphoneIcon,
	flag: FlagIcon,
	strava: StravaIcon,
	spotify: SpotifyIcon,
	headphoneSync: HeadphoneSync
} as const;

export type IconName = keyof typeof Icons;
