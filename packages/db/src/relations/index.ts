import { defineRelations } from 'drizzle-orm';

import * as schema from '../schema';

export const relations = defineRelations(schema, (r) => ({
  activityMap: {
    activity: r.one.activity({
      from: r.activityMap.activityId,
      to: r.activity.id,
      alias: 'activityMap-activity',
    }),
  },

  activitySummary: {
    activity: r.one.activity({
      from: r.activitySummary.activityId,
      to: r.activity.id,
      alias: 'activitySummary-activity',
    }),
  },

  activity: {
    athlete: r.one.athlete({
      from: r.activity.athleteId,
      to: r.athlete.id,
      alias: 'activity-athlete',
    }),
    tracks: r.many.track({
      from: r.activity.id,
      to: r.track.activityId,
      alias: 'activity-tracks',
    }),
  },

  athlete: {
    activities: r.many.activity({
      from: r.athlete.id,
      to: r.activity.athleteId,
      alias: 'athlete-activities',
    }),
    profiles: r.many.profile({
      from: r.athlete.id,
      to: r.profile.athleteId,
      alias: 'athlete-profiles',
    }),
    tokens: r.many.token({
      from: r.athlete.id,
      to: r.token.athleteId,
      alias: 'athlete-tokens',
    }),
  },

  profile: {
    athlete: r.one.athlete({
      from: r.profile.athleteId,
      to: r.athlete.id,
      alias: 'profile-athlete',
    }),
  },
}));
