import { Get, JsonController, Post } from "routing-controllers";
import { MakeService } from "@modules/make/services/make.services";
import { container } from "@src/container";

@JsonController('/make')
export class MakeController {
  private makeService: MakeService;
  
  constructor() {
    this.makeService = container.get(MakeService.name);
  }
  
  @Get()
  getAllMakes() {
    return this.makeService.getAllMakes();
  }
  
  @Post()
  createMake() {
    return 'Create a single make'
  }
}