import { Request, Response } from 'express';
import { URLSearchParams } from 'url';

import { stravaAPI } from '@/config/axios';
import {
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
  VERIFY_TOKEN,
  WEBHOOK_CALLBACK_URL,
} from '@/config/env';
import { STRAVA_WEBHOOK_URL } from '@/constants';
import {
  LLMActivityInsightResponse,
  LLMHeartbeatAnalysisResponse,
} from '@/types/llm.type';
import { WebhookRequestBody } from '@/types/request.type';

import { generetePrompt } from '../llm/llm.service';
import { fetchActivity } from '../strava/strava.api';
import { saveActivity } from '../strava/strava.service';
import { verifyToken } from '../token/token.service';
import { ValidationError } from './../../../errors/index';
import {
  getHeartRateForEachSongFromActivity,
  updateStravaActivityWithLLMDescription,
} from './webhook.service';

export const verifyStravaWebhook = (req: Request, res: Response) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      console.log('chal', challenge, token, mode);
      res.json({ 'hub.challenge': challenge });
    } else {
      res.sendStatus(403);
    }
  }
};

export const stravaWebhookResponse = async (
  req: Request<unknown, unknown, WebhookRequestBody>,
  res: Response,
) => {
  const aspectType = req.body.aspect_type;
  console.log('Received webhook:', req.body);

  if (aspectType !== 'create') {
    return res.status(200).send({
      message: "This webhook only handles 'create' events for activity sync",
    });
  }

  const { result: spotifyAccessToken } = await verifyToken('spotify');
  const { result: stravaAccessToken } = await verifyToken('strava');

  const activityId = req.body.object_id;
  const athleteId = req.body.owner_id;

  const activity = await fetchActivity(stravaAccessToken, activityId);

  const updatedActivity = await updateStravaActivityWithLLMDescription(
    activity,
    stravaAccessToken,
  );

  const heartRateData = await getHeartRateForEachSongFromActivity(
    stravaAccessToken,
    spotifyAccessToken,
    activityId,
    activity.start_date,
    activity.elapsed_time,
  );

  const heartBeatAnalysis = await generetePrompt<LLMHeartbeatAnalysisResponse>(
    heartRateData,
    'heartbeatSongAnalysis',
  );

  let activityInsight = undefined;

  if (updatedActivity.map.polyline !== '') {
    activityInsight = await generetePrompt<LLMActivityInsightResponse>(
      updatedActivity,
      'stravaInsight',
    );
  }

  const response = await saveActivity(
    updatedActivity,
    athleteId,
    heartBeatAnalysis,
    activityInsight,
  );

  res.send(response).status(200);
};

export const registerWebhook = async (_req: Request, res: Response) => {
  const params = new URLSearchParams();

  params.set('client_id', STRAVA_CLIENT_ID!);
  params.set('client_secret', STRAVA_CLIENT_SECRET!);
  params.set('callback_url', WEBHOOK_CALLBACK_URL!);
  params.set('verify_token', STRAVA_CLIENT_ID!);

  const response = await stravaAPI({ baseURL: STRAVA_WEBHOOK_URL }).post('', {
    params,
  });

  res.status(response.status).send(response.data);
};

export const viewWebhook = async (_req: Request, res: Response) => {
  const params = new URLSearchParams();

  params.set('client_id', STRAVA_CLIENT_ID!);
  params.set('client_secret', STRAVA_CLIENT_SECRET!);

  const response = await stravaAPI({ baseURL: STRAVA_WEBHOOK_URL }).get('', {
    params,
  });

  res.status(response.status).send(response.data);
};
export const deleteWebhook = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) throw new ValidationError('Parameter id is missing', 400);

  const params = new URLSearchParams();

  params.set('client_id', STRAVA_CLIENT_ID!);
  params.set('client_secret', STRAVA_CLIENT_SECRET!);

  const response = await stravaAPI({ baseURL: STRAVA_WEBHOOK_URL }).delete(
    `/${id}`,
    {
      params,
    },
  );

  res.status(response.status).send(response.data);
};
