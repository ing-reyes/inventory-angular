export class Product {
    constructor(
        public id: string,
        public name: string,
        public stock: number,
        public category: string,
        public entryDate: Date,
        public createdAt: Date,
        public updatedAt: Date,
        public active: boolean,
        public description?: string,
        public departureDate?: Date,
    ){}
}
