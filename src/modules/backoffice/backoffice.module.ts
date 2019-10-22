import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './services/customer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { CustomerSchema } from './schemas/customer.schema';
import { AccountService } from './services/account.service';
import { PetController } from './controllers/pet.controller';
import { PetService } from './services/pet.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'User',
                schema: UserSchema
            },
            {
                name: 'Customer',
                schema: CustomerSchema
            }
        ])
    ],
    controllers: [CustomerController, PetController],
    providers: [AccountService, CustomerService, PetService]
})
export class BackofficeModule {}
