import { Get, JsonController, Param, Post } from "routing-controllers";
import { MakeService } from "@modules/make/services/make.services";
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
  createMake() {
    return 'Create a single make'
  }
}