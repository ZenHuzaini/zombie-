import { Test, TestingModule } from '@nestjs/testing';
import { ZombieController } from './zombie.controller';

describe('ZombieController', () => {
  let controller: ZombieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZombieController],
    }).compile();

    controller = module.get<ZombieController>(ZombieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
