import { NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { IContract } from "src/modules/backoffice/contracts/icontract";
import { Result } from "src/modules/backoffice/models/result.model";

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
    constructor(public contract: IContract) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const body = context.switchToHttp().getRequest().body;
        const valid = this.contract.validate(body);

        if (!valid) {
            throw new HttpException(new Result('Ops, algo deu errado...', false, null, this.contract.error), HttpStatus.BAD_REQUEST);
        }

        return next.handle();
    }
}