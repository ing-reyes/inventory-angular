
export class Category {
    constructor(
        public id: string,
        public name: string,
        public createdAt: Date,
        public updatedAt: Date,
        public active: boolean,
        public description?: string,
    ) { }
}
