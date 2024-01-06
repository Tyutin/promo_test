import { sharedHeaders } from '../../../shared/constants/shared-headers';
import { getSession } from '@/typeorm/getSession';
import { OrdersResponseInterface } from '@shared/types/Order/front/OrdersResponse.interface';
import { OrderResponseInterface } from '../../../backend/src/order/types/OrderResponse.interface';
import { UpdateMyOrderDtoInterface } from '@shared/types/Order/UpdateMyOrder.dto';

export const BACKEND_API_HOST = process.env.BACKEND_API_HOST || 'http://backend:3001' 

async function fetchBuilder (props: {endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'}, data?: any): Promise<Response> {
  const {endpoint,method} = props
  const url = `${BACKEND_API_HOST}/${endpoint}`

  const session = await getSession()

  const userSessionTokenValue = session.sessionToken

  const headersToNest: Record<string,string> = {
    'Content-Type': 'application/json'
  }
  headersToNest[sharedHeaders.userSessionToken] = userSessionTokenValue || ''

  return await fetch(url, {cache: 'no-cache', method, headers: headersToNest, body: !!data ? JSON.stringify(data) : null})
}

export const fetchData = {
  orders: {
    getAllMyOrders: async (): Promise<OrdersResponseInterface | null> => {
      try {
        const response = await fetchBuilder({endpoint: 'orders/my', method: 'GET'})
        return await response.json()
      } catch {
        return null
      }
    },
    getMyOrder: async (orderId: string): Promise<OrderResponseInterface | null> => {
      try {
        const response = await fetchBuilder({endpoint: `orders/my/${orderId}`, method: 'GET'})
        return await response.json()
      } catch {
        return null
      }
    },
    updateMyOrder: async(orderId: string, dto: UpdateMyOrderDtoInterface): Promise<OrderResponseInterface | null> => {
      const data = {
        order: dto
      }
      try {
        const response = await fetchBuilder({endpoint: `orders/my/${orderId}`, method: 'PUT'}, data)
        return await response.json()
      } catch {
        return null
      }
    }
  }
}