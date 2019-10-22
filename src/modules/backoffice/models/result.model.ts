export class Result {
    constructor(
        public message: string,
        public status: boolean,
        public data: any,
        public errors: any
    ) { }
}