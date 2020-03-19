import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  it('should create the app', () => {
    const reversePipe = new ReversePipe();
    expect(reversePipe.transform('hello')).toEqual('olleh');
  });
});
