import '@testing-library/jest-dom/extend-expect';

import { useThemeContext } from '@cc/shared/lib';
import { ThemeModeType } from '@cc/shared/types';
import { render } from '@testing-library/react';
import { Typography } from '../Typography';

jest.mock('@cc/shared/lib', () => ({
  useThemeContext: jest.fn(),
}));

jest.mock('@cc/shared/styles/Variables.module.scss', () => ({
  primaryLight: 'primaryLight',
  logo: 'logo',
}));

describe('Typography shared component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('render where prop "tint" is false and "themeMode" is light', () => {
    const text = 'Some text without tint';
    mockThemeMode('light');

    const { getByText } = renderTypography(text);

    expect(getByText(text)).toBeInTheDocument();
  });

  it('render where prop "tint" is false and "themeMode" is dark', () => {
    const text = 'Some text without tint';
    mockThemeMode('dark');

    const { getByText } = renderTypography(text, true);

    expect(getByText(text)).toBeInTheDocument();
  });

  it('render where prop "tint" is true and "themeMode" is light', () => {
    const text = 'Some text with tint';
    mockThemeMode('light');

    const { getByText } = renderTypography(text);

    expect(getByText(text)).toBeInTheDocument();
  });

  it('render where prop "tint" is true and "themeMode" is dark', () => {
    const text = 'Some text with tint';
    mockThemeMode('dark');

    const { getByText } = renderTypography(text, true);

    expect(getByText(text)).toBeInTheDocument();
  });

  function renderTypography(content: string, tint: boolean = false) {
    return render(<Typography tint={tint}>{content}</Typography>);
  }

  function mockThemeMode(themeMode: ThemeModeType) {
    (useThemeContext as jest.Mock).mockReturnValue({ themeMode });
  }
});
