export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export interface User{
    ID_User : number | null | undefined;
    name: string;
    surname: string;
    login:string;
    password: string;
    email: string;
    userRole: UserRole;
    enabled: boolean;
    locked: boolean;

}