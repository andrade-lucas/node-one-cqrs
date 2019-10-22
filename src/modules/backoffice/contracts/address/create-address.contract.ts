import { IContract } from "../icontract";
import { Flunt } from "src/validators/flunt.validator";
import { Injectable } from "@nestjs/common";
import { Address } from "../../models/address.model";

@Injectable()
export class CreateAddressContract implements IContract {
    error: string[];
    
    validate(model: Address): boolean {
        let flunt = new Flunt();
        flunt.hasMinLen(model.street, 3, 'O campo rua deve ter pelo menos 3 caracteres');
        flunt.isFixedLen(model.zipCode, 8, 'CEP inválido');
        flunt.isFixedLen(model.state, 2, 'Estado inválido');
        flunt.isNullOrEmpty(model.neighborhood, 'O campo bairro não pode ser vazio');

        this.error = flunt.errors;
        return flunt.isValid();
    }
}