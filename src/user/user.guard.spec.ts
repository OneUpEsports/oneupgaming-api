import { GqlAuthGuard } from './user.guard';

describe('UserGuard', () => {
  it('should be defined', () => {
    expect(new GqlAuthGuard()).toBeDefined();
  });
});
