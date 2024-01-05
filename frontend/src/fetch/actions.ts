'use server'

import { fetchData } from '@fetch/fetchData';
import { UpdateMyOrderDtoInterface } from '@shared/types/Order/UpdateMyOrder.dto';
import { revalidatePath } from 'next/cache';

export async function updateMyProductAction(orderId: string, dto: UpdateMyOrderDtoInterface) {
  const data = await fetchData.orders.updateMyOrder(orderId, dto)
  revalidatePath('/');
  return data
}
