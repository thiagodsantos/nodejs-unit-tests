import { constants } from "http2";
import { Body, Get, Post, JsonController, Param, HttpCode, Res } from "routing-controllers";
import { MakeService } from "@modules/make/services/make.services";
import { CreateDTO } from "@modules/make/dto/create.dto";
import container from '@src/container';

@JsonController('/make')
export class MakeController {
  private readonly makeService: MakeService = container.resolve(MakeService);
  
  @Get()
  async getAll() {
    return await this.makeService.getAll();
  }
  
  @Get('/:id')
  async getMakeById(@Param('id') id: string) {
    return await this.makeService.getById(id);
  }
  
  @Post()
  @HttpCode(constants.HTTP_STATUS_CREATED)
  async create(@Body() createDTO: CreateDTO) {
    return await this.makeService.create(createDTO);
  }
}