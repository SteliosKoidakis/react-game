import { renderHook, act } from '@testing-library/react-hooks';
import Axios, { get } from 'axios';
import useHttp from './useHttp';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('Given useHttp hook', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });
  describe('When is called with truthy string  url parameter', () => {
    it('Then it should trigger get method with the passed url', async () => {
      await act(async () => renderHook(() => useHttp('url')));

      expect(get).toHaveBeenCalledWith('url');
    });
  });
  describe('And the http call is successful', () => {
    it('Then it should update fetchedData with the response data', async () => {
      Axios.get.mockReturnValueOnce(({ data: [1, 2, 3] }));
      const { result, waitForNextUpdate } = renderHook(() => useHttp('url'));
      await waitForNextUpdate();
      expect(result.current[0]).toStrictEqual([1, 2, 3]);
    });
  });
  describe('When is called with a none string url parameter', () => {
    it('Then it should not trigger the get method', async () => {
      await act(async () => renderHook(() => useHttp()));
      await act(async () => renderHook(() => useHttp({})));

      expect(get).toHaveBeenCalledTimes(0);
    });
  });
  describe('When is called and an error is catched', () => {
    it('Then it should return an empty array', async () => {
      Axios.get = jest.fn(() => Promise.reject());
      const { result, waitForNextUpdate } = renderHook(() => useHttp('url'));
      await waitForNextUpdate();
      expect(result.current[0]).toStrictEqual([]);
    });
  });
});
