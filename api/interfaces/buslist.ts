import { ShiftEnum } from '../enums/buslist';

export interface IBusList {
  id: string;
  students: string[];
  name: string;
  list_date: string;
  list_time_initial: string;
  list_time_final: string;
  shift: ShiftEnum;
  type_creation: string;
  is_enable: boolean;
  created_at: string;
  updated_at: string;
}
