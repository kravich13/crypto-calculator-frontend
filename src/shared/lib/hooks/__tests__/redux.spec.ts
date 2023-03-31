import { RootState } from '@cc/shared/types';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../redux';

jest.mock('react-redux');

describe('useAppDispatch', () => {
  test('should call useDispatch hook', () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    useAppDispatch();

    expect(useDispatch).toHaveBeenCalled();
  });

  test('should return the same dispatch instance', () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    const result = useAppDispatch();

    expect(result).toBe(mockDispatch);
  });
});

describe('useAppSelector', () => {
  test('should call useSelector hook', () => {
    const mockSelector = jest.fn();
    (useSelector as jest.Mock).mockReturnValue(mockSelector);

    useAppSelector((state: RootState) => state.authReducer);

    expect(useSelector).toHaveBeenCalled();
  });

  test('should return the same selector instance', () => {
    const mockSelector = jest.fn();
    (useSelector as jest.Mock).mockReturnValue(mockSelector);

    const result = useAppSelector((state: RootState) => state.authReducer);

    expect(result).toBe(mockSelector);
  });
});
