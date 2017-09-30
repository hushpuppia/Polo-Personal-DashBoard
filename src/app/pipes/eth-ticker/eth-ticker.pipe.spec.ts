import { EthTickerPipe } from './eth-ticker.pipe';

describe('EthTickerPipe', () => {
  it('create an instance', () => {
    const pipe = new EthTickerPipe();
    expect(pipe).toBeTruthy();
  });
});
