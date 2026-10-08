import { AppService } from './appService';

// Some simple unit tests, more will be added later

describe('AppService', () => {
  const service = new AppService();

  it('formats dates in local time, not UTC', () => {
    //
    expect(service.toLocalDateString(new Date(2026, 9, 6, 0, 30))).toBe('2026-10-06');
  });

  it('pads month and day', () => {
    expect(service.toLocalDateString(new Date(2026, 0, 5))).toBe('2026-01-05');
  });
});
