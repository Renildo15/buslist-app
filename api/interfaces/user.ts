import { SexEnum, StatusEnum, TeachingLevelEnum } from "../enums/user";

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

export interface IUserStudentInfo {
    name_student: string
    sex_student: SexEnum
    matriculation_student: string
    status_student: StatusEnum
    teaching_level_student: TeachingLevelEnum
    course_student: string
}