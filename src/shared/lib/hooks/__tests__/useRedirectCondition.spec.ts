import { renderHook } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { RoutesTypes } from '../../../enums';
import { useRedirectCondition } from '../useRedirectCondition';

jest.mock('next/navigation');

describe('useRedirectCondition', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should not redirect when condition is false', () => {
    const { result } = renderHook(() =>
      useRedirectCondition({ condition: false, redirectTo: RoutesTypes.MAIN })
    );

    expect(result.current.showContent).toBe(true);
    expect(pushMock).not.toHaveBeenCalled();
  });

  it('should redirect when condition is true', () => {
    const { result } = renderHook(() => useRedirectCondition({ redirectTo: RoutesTypes.MAIN }));

    expect(result.current.showContent).toBe(false);
    expect(pushMock).toHaveBeenCalledWith('/');
  });
});
