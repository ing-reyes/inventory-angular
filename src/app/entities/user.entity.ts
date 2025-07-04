import { UserRole } from "@enums/user-role.enum";

export class User{

    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public role: UserRole,
        public active: boolean,
        public createdAt: Date,
        public updatedAt: Date,
        public img?: string,
    ){}
}
