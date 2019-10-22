export interface IContract {
    error: string[];
    validate(model: any): boolean;
}