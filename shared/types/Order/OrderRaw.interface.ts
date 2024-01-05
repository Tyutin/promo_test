import { OrderStatus } from "./orderStatus";

export interface OrderRawInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: OrderStatus;
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
  name?: string;
}