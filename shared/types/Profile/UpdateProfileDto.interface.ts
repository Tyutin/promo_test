import { ProfileRawInterface } from "./ProfileRaw.interface";

export interface UpdateProfileDtoInterface extends Omit<ProfileRawInterface, 'id' | 'points'> {}