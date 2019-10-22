import { IContract } from "../icontract";
import { Injectable } from "@nestjs/common";
import { Flunt } from "src/validators/flunt.validator";
import { CreateCustomerDto } from "../../dto/create-customer.dto";

@Injectable()
export class CreateCustomerContract implements IContract {
    error: string[];
    
    validate(model: CreateCustomerDto): boolean {
        let flunt = new Flunt();
        flunt.hasMinLen(model.name, 3, 'O campo nome deve ter pelo menos 3 caracteres');
        flunt.isEmail(model.email, 'E-mail inválido');
        flunt.isCpf(model.document, 'CPF inválido');

        this.error = flunt.errors;
        return flunt.isValid();
    }
}