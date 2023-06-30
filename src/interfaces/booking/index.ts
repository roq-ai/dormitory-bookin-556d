import { UserInterface } from 'interfaces/user';
import { DormitoryInterface } from 'interfaces/dormitory';
import { GetQueryInterface } from 'interfaces';

export interface BookingInterface {
  id?: string;
  checkin_date: any;
  days_to_stay: number;
  number_of_persons: number;
  total_price: number;
  user_id?: string;
  dormitory_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  dormitory?: DormitoryInterface;
  _count?: {};
}

export interface BookingGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  dormitory_id?: string;
}
