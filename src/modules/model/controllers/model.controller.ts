import { Body, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";
import { ModelService } from "@modules/model/services/model.service";
import container from "@src/container";
import { ModelCreateDTO } from "@modules/model/dto/model-create.dto";
import { ModelUpdateDTO } from "@modules/model/dto/model-update.dto";

@JsonController('/model')
export class ModelController {
  private modelService: ModelService;
  
  constructor() {
    this.modelService = container.resolve(ModelService);
  }
  
  @Get()
  async getAll() {
    return await this.modelService.getAll();
  }
  
  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this.modelService.getById(id);
  }
  
  @Post()
  async create(@Body() createDTO: ModelCreateDTO) {
    return await this.modelService.create(createDTO);
  }
  
  @Put('/:id')
  async update(@Param('id') id: string, @Body() updateDTO: ModelUpdateDTO) {
    return await this.modelService.updateById(id, updateDTO);
  }
  
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.modelService.deleteById(id);
  }
}