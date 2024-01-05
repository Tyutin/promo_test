import { OrderRawInterface } from "./OrderRaw.interface";

export interface UpdateOrderDtoInterface extends Partial<Omit<OrderRawInterface, 'createdAt' | 'updatedAt'>> {}