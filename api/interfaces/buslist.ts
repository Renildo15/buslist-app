import { ShiftEnum } from '../enums/buslist';
import { IUserStudent } from './user';

export interface IBusList {
  id: string;
  name: string;
  list_date: string;
  list_time_initial: string;
  list_time_final: string;
  shift: ShiftEnum;
  type_creation: string;
  is_enable: boolean;
  students: IUserStudent[]
  created_at: string;
  updated_at: string;
}

export interface IBusListStudentCreate {
  end_class_time: string;
  is_return: boolean;
}