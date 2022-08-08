import { Body, Delete, Get, JsonController, Param, Post, Put } from 'routing-controllers';
import { MakeService } from '@modules/make/services/make.services';
import { MakeCreateDTO } from '@modules/make/dto/make-create.dto';
import { MakeUpdateDTO } from '@modules/make/dto/make-update.dto';
import container from '@src/container';

@JsonController('/make')
export class MakeController {
  private makeService: MakeService;
  
  constructor() {
    this.makeService = container.resolve(MakeService);
  }
  
  @Get()
  async getAll() {
    return await this.makeService.getAll();
  }
  
  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this.makeService.getById(id);
  }
  
  @Post()
  async create(@Body() createDTO: MakeCreateDTO) {
    return await this.makeService.create(createDTO);
  }
  
  @Put('/:id')
  async update(@Param('id') id: string, @Body() updateDTO: MakeUpdateDTO) {
    return await this.makeService.updateById(id, updateDTO);
  }
  
  @Delete('/:id')
  async deleteById(@Param('id') id: string) {
    return await this.makeService.deleteById(id);
  }
}