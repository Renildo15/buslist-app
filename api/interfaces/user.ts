import { SexEnum, StatusEnum, TeachingLevelEnum } from '../enums/user';

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  is_student: boolean;
  is_driver: boolean;
  is_staff: boolean;
  is_superuser: boolean;
}

export interface IUserStudentProfile {
  id: string;
  avatar: string;
  institution: string;
  phone_number: string;
  matric_number: string;
  sex: SexEnum;
  status: StatusEnum;
  teaching_level: TeachingLevelEnum;
  course_name: string;
  bus_stop: string;
}

export interface IUserStudentInfo {
  name_student: string;
  sex_student: SexEnum;
  matriculation_student: string;
  status_student: StatusEnum;
  teaching_level_student: TeachingLevelEnum;
  course_student: string;
}

export interface IUserStudentCreate {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
}

export interface IUserStudent extends IUser {
  profile: IUserStudentProfile;
}
