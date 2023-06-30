import { DormitoryInterface } from 'interfaces/dormitory';
import { GetQueryInterface } from 'interfaces';

export interface OfferInterface {
  id?: string;
  description: string;
  dormitory_id?: string;
  created_at?: any;
  updated_at?: any;

  dormitory?: DormitoryInterface;
  _count?: {};
}

export interface OfferGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  dormitory_id?: string;
}
