export interface ApiResponseBase<T> {
    message: string;
    error?: string;
    details?: any[];
    data?: T;
}