import type { WorkHoursInterface } from "./WorkHours.interface";

export const defaultWorkHours: WorkHoursInterface = {
  monday: {
    isWorking: true,
    startShippingTime: '09:00',
    endShippingTime: '15:00',
  },
  tuesday: {
    isWorking: true,
    startShippingTime: '09:00',
    endShippingTime: '15:00',
  },
  wednesday: {
    isWorking: true,
    startShippingTime: '09:00',
    endShippingTime: '15:00',
  },
  thursday: {
    isWorking: true,
    startShippingTime: '09:00',
    endShippingTime: '15:00',
  },
  friday: {
    isWorking: true,
    startShippingTime: '09:00',
    endShippingTime: '15:00',
  },
  saturday: {
    isWorking: false,
    startShippingTime: '09:00',
    endShippingTime: '15:00',
  },
  sunday: {
    isWorking: false,
    startShippingTime: '09:00',
    endShippingTime: '15:00',
  },
};
