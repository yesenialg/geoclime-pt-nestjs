export class AnomalyUsecaseDto {
  zone: string;
  records: {
    timestamp: string;
    temperature: number;
  }[];
}