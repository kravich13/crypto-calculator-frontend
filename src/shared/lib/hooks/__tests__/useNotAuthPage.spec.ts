import { renderHook } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { RoutesTypes } from '../../../enums';
import { useAppSelector } from '../redux';
import { useNotAuthPage } from '../useNotAuthPage';

jest.mock('next/navigation');
jest.mock('../redux');

describe('useNotAuthPage', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should show content when not authenticated', () => {
    (useAppSelector as jest.Mock).mockReturnValueOnce(false);

    const { result } = renderHook(() => useNotAuthPage({ redirectTo: RoutesTypes.MAIN }));

    expect(result.current.showContent).toBe(true);
    expect(pushMock).not.toHaveBeenCalled();
  });

  it('should redirect when authenticated', () => {
    (useAppSelector as jest.Mock).mockReturnValueOnce(true);

    const { result } = renderHook(() => useNotAuthPage({ redirectTo: RoutesTypes.MAIN }));

    expect(result.current.showContent).toBe(false);
    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('should redirect to a different route', () => {
    (useAppSelector as jest.Mock).mockReturnValueOnce(true);

    const { result } = renderHook(() => useNotAuthPage({ redirectTo: RoutesTypes.LOGIN }));

    expect(result.current.showContent).toBe(false);
    expect(pushMock).toHaveBeenCalledWith('/login');
  });
});
