import { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";

export const makeJWTCookie = (c: Context, refreshToken: string) => {
  setCookie(c, 'refresh_token', refreshToken,{
    secure:true,
    httpOnly: true,
    expires:new Date(Date.now() + 1000 * 60 * 60 * 24),
    sameSite: 'None'
  })
}

export const getJWTCookie = (c: Context) => {
  console.log(getCookie(c));
  return getCookie(c, 'refresh_token');
}