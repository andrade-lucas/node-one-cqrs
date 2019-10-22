import { Controller, Get, Param, Post, Body, Put, HttpException, HttpStatus } from "@nestjs/common";
import { Pet } from "../models/pet.model";
import { PetService } from "../services/pet.service";
import { Result } from "../models/result.model";

@Controller('v1/pets')
export class PetController {
    constructor(private service: PetService) { }

    @Get(':document/:id')
    async getById(@Param('document') document: string, @Param('id') id: string) {

    }

    @Post(':document')
    async post(@Param('document') document: string, @Body() model: Pet) {
        try {
            await this.service.create(document, model);
            return new Result('Pet criado com sucesso', true, model, null);
        }
        catch (err) {
            throw new HttpException(new Result('Erro ao criar pet', false, null, err), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':document:id')
    async put(@Param('documetn') document, @Param('id') id, @Body() model: Pet) {
        try {
            await this.service.update(document, id, model);
            return new Result('pet atualizado com sucesso', true, model, null);
        }
        catch (err) {
            throw new HttpException(new Result('Erro ao atualizar pet', false, null, err), HttpStatus.BAD_REQUEST);
        }
    }
}