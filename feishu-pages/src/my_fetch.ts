import axios from "axios";

const RATE_LIMITS = {};
/**
 * Feishu Rate Limit:
 *
 * - 100 times/min
 * - 5 times/s in Max
 */
export const requestWait = async (ms?: number) => {
  ms = ms || 0;

  const minuteLockKey = new Date().getMinutes();
  if (!RATE_LIMITS[minuteLockKey]) {
    RATE_LIMITS[minuteLockKey] = 0;
  }

  // If overload 100 times/min, wait 1 minute
  if (RATE_LIMITS[minuteLockKey] >= 100) {
    console.warn("[RATE LIMIT] Overload request 100 times/min, wait 1 minute...");
    await await new Promise((resolve) => setTimeout(resolve, 60 * 1000));
    RATE_LIMITS[minuteLockKey] = 0;
  }

  await new Promise((resolve) => setTimeout(resolve, ms));
  RATE_LIMITS[minuteLockKey] += 1;
};

const MyFetch = axios.create();

MyFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { headers, data, status } = error.response;

    // Rate Limit code: 99991400, delay to retry
    if (data?.code === 99991400) {
      const rateLimitResetSeconds = headers["x-ogw-ratelimit-reset"];
      console.warn("[RATE LIMIT]", data.code, data.msg, `delay ${rateLimitResetSeconds}s to retry...`);

      // Delay to retry
      await requestWait(rateLimitResetSeconds * 1000);
      return await axios.request(error.config);
    }
    throw new Error(`request err respdata:${JSON.stringify(data, null, 4)} status:${status}`);
    // throw error;
  }
);

export default MyFetch;
