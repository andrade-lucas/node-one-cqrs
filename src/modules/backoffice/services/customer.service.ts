import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from "../models/customer.model";

@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) { }

    async findAll() {
        return await this.model.find({}, 'name email document').sort('name').exec();
    }

    async findByDocument(document: string) {
        return await this.model.find({ document }).populate('user', 'username').exec();
    }

    async create(model: Customer) {
        const customer = new this.model(model);
        await customer.save();
    }

    async update(document: string, model: Customer): Promise<Customer> {
        return await this.model.findOneAndUpdate({ document }, {
            $set: {
                name: model.name,
                email: model.email
            }
        }).exec();
    }

    async delete(document: string): Promise<Customer> {
        return await this.model.findOneAndRemove({ document }).exec();
    }
}