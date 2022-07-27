import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CreateDTO } from "@modules/make/dto/create.dto";

@Entity({ name: 'make' })
export class MakeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  
  fromCreateDTO(createDTO: CreateDTO) {
    this.name = createDTO.name;
  }
}
