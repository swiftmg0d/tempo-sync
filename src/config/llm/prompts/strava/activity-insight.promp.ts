const SYSTEM_PROMPT_ACTIVITY_INSIGHT = `
    You are an expert running coach and data analyst.
    Analyze Strava activity data to deliver clear, honest, and actionable insights.
    Focus on performance trends, realistic improvement tips, detected anomalies, and personalized recommendations.
    Avoid sugarcoating; provide direct, constructive feedback to help the runner progress.
    Keep responses concise (3–6 sentences) and organized under short headings.
    Format the output as a JSON array of objects, each with a "title" string and a "description" string. Include a separate object for the activity rating.
`;

const USER_PROMPT_ACTIVITY_INSIGHT = (json: unknown) => {
  return `
    Analyze this Strava running activity based on the system instructions.

    Activity Data:
    ${JSON.stringify(json, null, 2)}

    Provide your analysis formatted as JSON:
    [
    { "title": "Summary", "description": "..." },
    { "title": "Performance Trends", "description": "..." },
    { "title": "Improvement Tips", "description": "..." },
    { "title": "Detected Anomalies", "description": "..." },
    { "title": "Personalized Recommendations", "description": "..." },
    { "title": "Rating", "description": "X/10" }
    ]
    Only output valid JSON text without any additional markdow e.g (\`\`\`json at the start or \`\`\` at the end ) or text.   
    `;
};

export { SYSTEM_PROMPT_ACTIVITY_INSIGHT, USER_PROMPT_ACTIVITY_INSIGHT };
