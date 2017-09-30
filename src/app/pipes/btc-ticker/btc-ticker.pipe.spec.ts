import { BtcTickerPipe } from './btc-ticker.pipe';

describe('BtcTickerPipe', () => {
  it('create an instance', () => {
    const pipe = new BtcTickerPipe();
    expect(pipe).toBeTruthy();
  });
});
