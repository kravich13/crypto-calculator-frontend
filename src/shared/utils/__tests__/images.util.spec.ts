import { ThemeModeType } from '@cc/shared/types';
import { darkPixel, getBlurDataUrl, lightPixel } from '../images.util';

describe('images util getBlurDataUrl', () => {
  it('should return the dark theme pixel data URL', () => {
    const theme: ThemeModeType = 'dark';
    const expectedDataUrl = `data:image/png;base64, ${darkPixel}`;
    const result = getBlurDataUrl(theme);

    expect(result).toBe(expectedDataUrl);
  });

  it('should return the light theme pixel data URL', () => {
    const theme: ThemeModeType = 'light';
    const expectedDataUrl = `data:image/png;base64, ${lightPixel}`;
    const result = getBlurDataUrl(theme);

    expect(result).toBe(expectedDataUrl);
  });
});
