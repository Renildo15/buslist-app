export const validateField = (field: string, value:string) => {
    if (!value.trim()) {
        return `${field} é obrigatório`;
    }
    return '';
};