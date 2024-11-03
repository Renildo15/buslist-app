import { IBusList } from "./buslist";
import { IUser } from "./user";

export interface INotice {
    id: string;
    title: string;
    description: string;
    viewed: boolean;
    buslist: string;
    created_at: string;
    updated_at: string;
    created_by: IUser;
}