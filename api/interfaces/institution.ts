import { IAddress } from "./address";

export interface IInstitution {
    id: string;
    name: string;
    phone_number: string;
    acronym: string;
    address: IAddress;
    in_vacation: boolean;
}