import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ZoneEntity } from "./zone.entity";

@Entity('records')
export class RecordEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ZoneEntity, (zone) => zone.records)
  @JoinColumn({ name: 'zone_id' })
  zone: ZoneEntity;

  @Column()
  temperature: number;

  @Column()
  timestamp: Date;
}