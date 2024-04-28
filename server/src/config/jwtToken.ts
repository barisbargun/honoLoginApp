import { sign, verify } from 'hono/jwt'

export const createToken = async (sub: ITokenSub, secret: string, exp: number = 5) => {
  const payload = {
    sub,
    exp: Math.floor(Date.now() / 1000) + 60 * exp,
  }
  const token = await sign(payload, secret);
  return token;
}

export const verifyToken = async (token: string, secret: string) => {
  try {
    const decodedPayload = await verify(token, secret)
    return decodedPayload;
  } catch (error) {
    return null
  }

}



