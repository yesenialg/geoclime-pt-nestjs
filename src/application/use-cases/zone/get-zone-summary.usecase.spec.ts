import { GetZoneSummaryUseCase } from "./get-zone-summary.usecase";

describe("GetZoneSummaryUseCase", () => {
    let mockRecordRepository: any;
    let mockZoneRepository: any;
    let useCase: GetZoneSummaryUseCase;

    beforeEach(() => {
        mockRecordRepository = {
            findByZone: jest.fn()
        };
        mockZoneRepository = {
            findOneById: jest.fn()
        };
        useCase = new GetZoneSummaryUseCase(mockRecordRepository, mockZoneRepository);
    });

    it("should return correct summary for multiple records", async () => {
        mockZoneRepository.findOneById.mockResolvedValue({ id: "zone-1", name: "Test Zone" });
        const records = [
            { temperature: 20 },
            { temperature: 22 },
            { temperature: 24 }
        ];
        mockRecordRepository.findByZone.mockResolvedValue(records);

        const result = await useCase.execute("zone-1");
        expect(result).toEqual({
            zone: "zone-1",
            averageTemperature: 22,
            minTemperature: 20,
            maxTemperature: 24,
            recordsCount: 3
        });
    });

    it("should handle a single record", async () => {
        mockZoneRepository.findOneById.mockResolvedValue({ id: "zone-2", name: "Test Zone" });
        const records = [
            { temperature: 18 }
        ];
        mockRecordRepository.findByZone.mockResolvedValue(records);

        const result = await useCase.execute("zone-2");
        expect(result).toEqual({
            zone: "zone-2",
            averageTemperature: 18,
            minTemperature: 18,
            maxTemperature: 18,
            recordsCount: 1
        });
    });

    it("should handle no records", async () => {
        mockZoneRepository.findOneById.mockResolvedValue({ id: "zone-3", name: "Test Zone" });
        mockRecordRepository.findByZone.mockResolvedValue([]);

        const result = await useCase.execute("zone-3");
        expect(result).toEqual({
            zone: "zone-3",
            averageTemperature: NaN,
            minTemperature: Infinity,
            maxTemperature: -Infinity,
            recordsCount: 0
        });
    });

    it("should round average temperature to one decimal", async () => {
        mockZoneRepository.findOneById.mockResolvedValue({ id: "zone-4", name: "Test Zone" });
        const records = [
            { temperature: 20 },
            { temperature: 21 }
        ];
        mockRecordRepository.findByZone.mockResolvedValue(records);

        const result = await useCase.execute("zone-4");
        expect(result.averageTemperature).toBe(20.5);
    });
});