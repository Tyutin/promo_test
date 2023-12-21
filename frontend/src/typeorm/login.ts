'use server'

import { revalidatePath } from 'next/cache';
import { getSession } from './getSession';

export async function logout2() {
  'use server';

  // false => no db call for logout
  const session = await getSession();
  session.destroy();
  revalidatePath('/session');
}