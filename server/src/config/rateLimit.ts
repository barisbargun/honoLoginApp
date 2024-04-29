import { Context, Next } from "hono";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

const RATE_LIMIT_CONTEXT_KEY = ".rateLimited";
const STATUS_TOO_MANY_REQUESTS = 429;





interface RateLimitResponse {
	key: string;
	success: boolean;
}

interface RateLimitOptions {
	continueOnRateLimit: boolean;
}

type RateLimitKeyFunc = {
	(c: Context): string;
};


const rateLimit = (rateLimitBinding: RateLimitBinding, keyFunc: RateLimitKeyFunc) => {
	return createMiddleware(async (c: Context, next: Next) => {
		let key = keyFunc(c);
		if (!key) {
			console.warn("the provided keyFunc returned an empty rate limiting key: bypassing rate limits");
		}
		if (key) {
      console.log(key);
			let { success } = await rateLimitBinding.limit({ key: key });
			c.set(RATE_LIMIT_CONTEXT_KEY, success);

			if (!success) {
				throw new HTTPException(STATUS_TOO_MANY_REQUESTS, {
					res: c.text("rate limited", { status: STATUS_TOO_MANY_REQUESTS }),
				});
			}
		}

		// Call the next handler/middleware in the stack on success
		await next();
	});
};

const getKey: RateLimitKeyFunc = (c: Context): string => {
	// Rate limit on each API token by returning it as the key for our
	// middleware to use.
	return new URL(c.req.url).pathname
};

export const rateLimiter = async (c: Context<{Bindings:Bindings}>, next: Next) => {
	return await rateLimit(c.env.RATE_LIMITER, getKey)(c, next);
};