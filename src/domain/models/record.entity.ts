import { Zone } from './zone.entity';

export class Record {
  constructor(
    public readonly id: string,
    public readonly zone: Zone,
    public readonly temperature: number,
    public readonly timestamp: Date,
  ) {}
}