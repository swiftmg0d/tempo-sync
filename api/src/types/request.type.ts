export interface WebhookRequestBody {
	[x: string]: unknown;
	aspect_type: 'create' | 'delete' | 'update';
	event_time: number;
	object_id: number;
	object_type: 'activity' | 'athlete';
	owner_id: number;
	subscription_id: number;
	updates: Record<string, string>;
}
