import { InjectModel } from "@nestjs/mongoose";
import { User } from "../models/user.model";
import { Model } from 'mongoose';

export class AccountService {
    constructor(@InjectModel('User') private readonly model: Model<User>) { }

    async create(model: User): Promise<User> {
        const user = new this.model(model);
        return await user.save();
    }
}