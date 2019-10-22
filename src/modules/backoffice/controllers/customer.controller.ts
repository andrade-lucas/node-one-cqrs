import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { Result } from '../models/result.model';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contract';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';
import { Customer } from '../models/customer.model';

// http://localhost:3000/v1/customers
@Controller('v1/customers')
export class CustomerController {
    constructor(private customerService: CustomerService, private accountService: AccountService) {}

    @Get()
    get() {
        return 'Obter os clientes';
    }

    @Get(':document')
    getById(@Param('document') document: string) {
        return 'Obter cliente pelo documento ' + document;
    }

    @Post()
    // @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async post(@Body() model: CreateCustomerDto) {
        try {
            const user = await this.accountService.create(new User(model.document, model.password, true));            
            await this.customerService.create(new Customer(model.name, model.document, model.email, [], null, null, null, user));
            return new Result('Cliente cadastrado com sucesso', true, model, null);
        }
        catch (err) {
            throw new HttpException(new Result('Erro ao cadastrar cliente', false, null, err), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':document')
    put(@Param('document') document: string, @Body() model: CreateCustomerDto) {
        return new Result('Cliente atualizado com sucesso', true, model, null);
    }

    @Delete(':document')
    async delete(@Param('document') document: string) {
        try {
            await this.customerService.delete(document);
            return new Result('Cliente deletado com sucesso', true, null, null);
        }
        catch (err) {
            throw new HttpException(new Result('Erro ao deletar cliente', true, null, err), HttpStatus.BAD_REQUEST);
        }
    }
}