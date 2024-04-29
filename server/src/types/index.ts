interface ITokenSub {
  username:string;
  role?:number;
}



type Bindings = {
  SUPABASE_KEY: string;
  SUPABASE_URL: string;
  REFRESH_TOKEN_SECRET:string;
  ACCESS_TOKEN_SECRET:string;
  CLIENT_URL:string;
  NODE_ENV?:string;
  RATE_LIMITER: RateLimitBinding;
};

interface RateLimitBinding {
	limit: LimitFunc;
}

interface LimitFunc {
	(options: LimitOptions): Promise<RateLimitResult>;
}

interface RateLimitResult {
	success: boolean;
}

interface LimitOptions {
	key: string;
}