
export interface ApiAllResponse<T>{
    offset: number;
    limit: number;
    total: number;
    page: number;
    data: T[];
}