import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RecordEntity } from "./record.entity";

@Entity('zones')
export class ZoneEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => RecordEntity, (record) => record.zone)
  records: RecordEntity[];
}