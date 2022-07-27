import { injectable } from "tsyringe";
import { Make } from "@modules/make/entities/make.entity";
import { MakeRepositoryInterface } from "@modules/make/repositories/make.repository";

@injectable()
export class MakeRepository implements MakeRepositoryInterface {
  async getAll(): Promise<Make[]> {
    return [
      {
        id: '1',
        name: 'Audi'
      },
      {
        id: '2',
        name: 'BMW'
      },
      {
        id: '3',
        name: 'Chevrolet'
      },
      {
        id: '4',
        name: 'Dodge'
      },
    ]
  }
  
  async getById(id: string): Promise<Make | []> {
    const makes = await this.getAll();
    
    for (const make of makes) {
      if (make.id === id) {
        return make;
      }
    }
    
    return [];
  }
}