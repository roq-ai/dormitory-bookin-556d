import { BookingInterface } from 'interfaces/booking';
import { OfferInterface } from 'interfaces/offer';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface DormitoryInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  booking?: BookingInterface[];
  offer?: OfferInterface[];
  user?: UserInterface;
  _count?: {
    booking?: number;
    offer?: number;
  };
}

export interface DormitoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
