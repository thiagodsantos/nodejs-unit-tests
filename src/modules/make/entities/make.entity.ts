import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Make {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}
