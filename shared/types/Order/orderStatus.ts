export enum OrderStatus {
  processing = 'processing',
  shipping = 'shipping',
  delivered ='delivered',
  canceledByClient = 'canceledByClient',
  canceledByService = 'canceledByService'
}

export const OrderStatusValues: Record<OrderStatus, string> = {
  processing: 'В обработке',
  shipping: 'Доставка',
  delivered: 'Доставлен',
  canceledByClient: 'Отменён клиентом',
  canceledByService: 'Отменён сервисом',
}