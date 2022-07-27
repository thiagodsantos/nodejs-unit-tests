import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Make {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
}
