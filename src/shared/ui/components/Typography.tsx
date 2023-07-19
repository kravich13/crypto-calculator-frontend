import colors from '@cc/shared/styles/Variables.module.scss';
import { useThemeContext } from '@cc/shared/lib';
import { Typography as MuiTypography, TypographyProps } from '@mui/material';
import { CSSProperties } from '@mui/material/styles/createTypography';
import { useMemo } from 'react';

interface ITypographyProps {
  tint?: boolean;
  component?: React.ElementType;
}

export const Typography: React.FC<ITypographyProps & TypographyProps> = ({
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
