import { GetZoneAnomaliesUseCase } from "./get-zone-anomalies.usecase";

describe("GetZoneAnomaliesUseCase", () => {
    let mockRecordRepository: any;
    let useCase: GetZoneAnomaliesUseCase;

    beforeEach(() => {
        mockRecordRepository = {
            findByZoneOrdered: jest.fn()
        };
        useCase = new GetZoneAnomaliesUseCase(mockRecordRepository);
    });

    it("should return no anomalies when there are no anomaly sequences", async () => {
        const records = [
            { timestamp: new Date("2024-01-01T00:00:00Z"), temperature: 20 },
            { timestamp: new Date("2024-01-01T01:00:00Z"), temperature: 20.5 },
            { timestamp: new Date("2024-01-01T02:00:00Z"), temperature: 21 }
        ];
        mockRecordRepository.findByZoneOrdered.mockResolvedValue(records);

        const result = await useCase.execute("zone-1");
        expect(result).toEqual([]);
    });

    it("should detect a single anomaly sequence", async () => {
        const records = [
            { timestamp: new Date("2024-01-01T00:00:00Z"), temperature: 20 },
            { timestamp: new Date("2024-01-01T01:00:00Z"), temperature: 22 },
            { timestamp: new Date("2024-01-01T02:00:00Z"), temperature: 23.5 }
        ];
        mockRecordRepository.findByZoneOrdered.mockResolvedValue(records);

        const result = await useCase.execute("zone-1");
        expect(result).toEqual([
            {
                zone: "zone-1",
                records: [
                    { timestamp: "2024-01-01T00:00:00.000Z", temperature: 20 },
                    { timestamp: "2024-01-01T01:00:00.000Z", temperature: 22 },
                    { timestamp: "2024-01-01T02:00:00.000Z", temperature: 23.5 }
                ]
            }
        ]);
    });

    it("should detect multiple anomaly sequences", async () => {
        const records = [
            { timestamp: new Date("2024-01-01T00:00:00Z"), temperature: 20 },
            { timestamp: new Date("2024-01-01T01:00:00Z"), temperature: 22 },
            { timestamp: new Date("2024-01-01T02:00:00Z"), temperature: 23.5 },
            { timestamp: new Date("2024-01-01T03:00:00Z"), temperature: 25 }
        ];
        mockRecordRepository.findByZoneOrdered.mockResolvedValue(records);

        const result = await useCase.execute("zone-1");
        expect(result).toEqual([
            {
                zone: "zone-1",
                records: [
                    { timestamp: "2024-01-01T00:00:00.000Z", temperature: 20 },
                    { timestamp: "2024-01-01T01:00:00.000Z", temperature: 22 },
                    { timestamp: "2024-01-01T02:00:00.000Z", temperature: 23.5 },
                    { timestamp: "2024-01-01T03:00:00.000Z", temperature: 25 }
                ]
            }
        ]);
    });

    it("should return empty array if less than 3 records", async () => {
        const records = [
            { timestamp: new Date("2024-01-01T00:00:00Z"), temperature: 20 },
            { timestamp: new Date("2024-01-01T01:00:00Z"), temperature: 22 }
        ];
        mockRecordRepository.findByZoneOrdered.mockResolvedValue(records);

        const result = await useCase.execute("zone-1");
        expect(result).toEqual([]);
    });

    it("should handle timestamps that are not Date objects", async () => {
        const records = [
            { timestamp: "2024-01-01T00:00:00Z", temperature: 20 },
            { timestamp: "2024-01-01T01:00:00Z", temperature: 22 },
            { timestamp: "2024-01-01T02:00:00Z", temperature: 23.5 }
        ];
        mockRecordRepository.findByZoneOrdered.mockResolvedValue(records);

        const result = await useCase.execute("zone-1");
        expect(result).toEqual([
            {
                zone: "zone-1",
                records: [
                    { timestamp: "2024-01-01T00:00:00Z", temperature: 20 },
                    { timestamp: "2024-01-01T01:00:00Z", temperature: 22 },
                    { timestamp: "2024-01-01T02:00:00Z", temperature: 23.5 }
                ]
            }
        ]);
    });
});