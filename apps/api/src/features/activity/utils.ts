const normalizePace = (value: number): number => {
  const minutes = Math.floor(value);
  const seconds = Math.round((value - minutes) * 100);

  if (seconds >= 60) {
    return minutes + 1 + (seconds - 60) / 100;
  }

  return Math.round(value * 100) / 100;
};

export const aggregateActivityStreams = (data: (number | null)[], name: string) => {
  const totalMinutes = Math.ceil(data.length / 60);
  const streams = Array.from({ length: totalMinutes }, (_, minute) => {
    const start = minute * 60;
    const end = Math.min(start + 60, data.length);
    const count = end - start;

    let sum = 0;

    for (let i = start; i < end; i++) {
      sum += data[i] ?? 0;
    }

    const avg = sum / count;

    return {
      [name]: name === 'pace' ? normalizePace(avg) : Math.round(avg),
      minute,
    };
  });

  return streams;
};
