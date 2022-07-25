import { Get, JsonController, Post } from "routing-controllers";

@JsonController('/make')
export class MakeController {
    @Get()
    getAllMakes() {
        return 'Return all makes'
    }

    @Post()
    createMake() {
        return 'Create a single make'
    }
}