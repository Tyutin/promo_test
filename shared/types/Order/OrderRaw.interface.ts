export interface OrderRawInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  deliveryAddress: string;
  productPrice: number;
  shippingPrice: number;
  serviceCommission: number;
  clientNotes?: string;
  serviceNotes?: string;
  isPaidByClient: boolean;
  estimatedDeliveryTime: Date;
  cancelReason?: string;
  currentLocation?: string;
}