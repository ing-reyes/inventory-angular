export interface RegisterProductForm {
  name: string;
  stock: number;
  category: string;
  description?: string;
  entryDate: Date;
  departureDate: Date | null;
}
