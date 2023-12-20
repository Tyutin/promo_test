import type { WorkHoursInterface } from './extra/workHours/WorkHours.interface';
import type { DeliveryZoneInterface } from './extra/deliveryZone/DeliveryZone.interface';

export interface CityRawInterface {
  id: number;
  createdAt: Date;
  nextPayment: Date;
  isWorking: boolean;
  city: string;
  slugRu: string;
  slugEn: string;
  companyName: string;
  phones: string[];
  email: string;
  vkLink: string;
  telegramLink: string;
  instagramLink: string;
  legalInfo: string;
  minimumOrderFrom: number;
  newDayStartTime: number;
  workHours: WorkHoursInterface;
  deliveryZones: DeliveryZoneInterface[];
  shippingZoneMapLink: string;
}