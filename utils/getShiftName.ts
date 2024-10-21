import { ShiftEnum } from "@/api/enums/buslist";

export function getShiftName(status: ShiftEnum) {
    switch (status) {
        case ShiftEnum.M:
            return 'Manhã';
        case ShiftEnum.V:
            return 'Tarde';
            case ShiftEnum.N:
        return 'Noite';
        default:
            return 'Indefinido';
    }
}