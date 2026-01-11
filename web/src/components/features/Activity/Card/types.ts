export type ActivityCardProps = {
	title: string;
	date: Date;
	active: boolean;
	polyline: [number, number][];
	time: number;
	onClick?: () => void;
};
