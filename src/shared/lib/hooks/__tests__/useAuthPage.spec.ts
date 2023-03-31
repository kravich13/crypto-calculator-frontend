import { renderHook } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { RoutesTypes } from '../../../enums';
import { useAppSelector } from '../redux';
import { useAuthPage } from '../useAuthPage';

jest.mock('next/navigation');
jest.mock('../redux');

describe('useAuthPage', () => {
  const pushMock = jest.fn();
  const useSelectorMock = useAppSelector as jest.Mock;
  const mockIsAuth = true;

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    useSelectorMock.mockReturnValue(mockIsAuth);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should not redirect when isAuth is true', () => {
    const { result } = renderHook(() => useAuthPage({ redirectTo: RoutesTypes.LOGIN }));

    expect(result.current.showContent).toBe(true);
    expect(pushMock).not.toHaveBeenCalled();
  });

  it('should redirect when isAuth is false', () => {
    useSelectorMock.mockReturnValue(!mockIsAuth);

    const { result } = renderHook(() => useAuthPage({ redirectTo: RoutesTypes.LOGIN }));

    expect(result.current.showContent).toBe(false);
    expect(pushMock).toHaveBeenCalledWith(RoutesTypes.LOGIN);
  });

  it('should redirect to a different route', () => {
    useSelectorMock.mockReturnValue(!mockIsAuth);

    const { result } = renderHook(() => useAuthPage({ redirectTo: RoutesTypes.CONFIRM_EMAIL }));

    expect(result.current.showContent).toBe(false);
    expect(pushMock).toHaveBeenCalledWith('/confirm-email');
  });
});
