export interface WebhookRequestBody {
	aspect_type: 'create' | 'delete' | 'update';
	event_time: number;
	object_id: number;
	object_type: 'activity' | 'athlete';
	owner_id: number;
	subscription_id: number;
}
