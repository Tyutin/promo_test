type DeliveryCondition = {
  cartCostFrom: number;
  shippingCost: number;
};

export interface DeliveryZoneInterface {
  name: string;
  conditions: DeliveryCondition[];
}

