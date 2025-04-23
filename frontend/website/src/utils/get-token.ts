import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function getAuthenticationToken(request?: NextRequest) {
  const cookieStore = await cookies();

  const authenticationToken =
    request?.cookies.get('Authentication')?.value ||
    cookieStore.get('Authentication')?.value;

  return authenticationToken;
}
