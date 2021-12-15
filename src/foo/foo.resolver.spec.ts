import { Test, TestingModule } from '@nestjs/testing';
import { FooResolver } from './foo.resolver';

describe('FooResolver', () => {
  let resolver: FooResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FooResolver],
    }).compile();

    resolver = module.get<FooResolver>(FooResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
