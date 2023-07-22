import { useThemeContext } from '@cc/shared/lib';
import colors from '@cc/shared/styles/Variables.module.scss';
import { Typography as MuiTypography, TypographyProps } from '@mui/material';
import { CSSProperties } from '@mui/material/styles/createTypography';
import { useMemo } from 'react';

interface ITypographyProps extends TypographyProps {
  tint?: boolean;
  component?: any;
}

export const Typography: React.FC<ITypographyProps> = ({
  tint,
  style,
  children,
  ...otherProps
}) => {
  const { themeMode } = useThemeContext();

  const tintColor: CSSProperties = useMemo(
    () => (tint ? { color: themeMode === 'light' ? colors.primaryLight : colors.logo } : {}),
    [themeMode, tint]
  );

  return (
    <MuiTypography style={{ ...tintColor, ...style }} {...otherProps}>
      {children}
    </MuiTypography>
  );
};
