import { Exclude } from "class-transformer";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MakeCreateDTO } from "@modules/make/dto/make-create.dto";
import { MakeUpdateDTO } from "@modules/make/dto/make-update.dto";

@Entity({ name: 'make' })
export class MakeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  
  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date | null;
  
  fromCreateDTO(createDTO: MakeCreateDTO) {
    this.name = createDTO.name;
  }
  
  fromUpdateDTO(updateDTO: MakeUpdateDTO) {
    this.name = updateDTO.name;
  }
}
