import { Test, TestingModule } from '@nestjs/testing';
import { ZombieService } from './zombie.service';

describe('ZombieService', () => {
  let service: ZombieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZombieService],
    }).compile();

    service = module.get<ZombieService>(ZombieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
