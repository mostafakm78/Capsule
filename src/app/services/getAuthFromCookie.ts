import 'server-only';
import { cookies } from 'next/headers';
import { jwtVerify, JWTPayload } from 'jose';

type Payload = JWTPayload & { id?: string; role?: string };

export async function getAuthFromCookie() {
  const token = await cookies();
  const accessToken = token.get('accessToken')?.value;
  if (!accessToken) return null;

  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  try {
    const { payload } = await jwtVerify(accessToken, secret);
    const { id, role, exp } = payload as Payload;
    return { id, role, exp };
  } catch {
    return null;
  }
}
