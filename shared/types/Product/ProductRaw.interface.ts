export interface ProductRawInterface {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  weight: number;
  slugEn: string;
  slugRu: string;
  startAvailableTime: Date;
  endAvailableTime: Date;
  published: boolean;
}