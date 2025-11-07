import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';
jest.mock('lodash', () => ({ throttle: jest.fn((fn) => fn) }));

const axiosMock = {
  defaults: {},
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  },
  get: jest.fn(),
  delete: jest.fn(),
  head: jest.fn(),
  options: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  getUri: jest.fn(),
} as unknown as AxiosInstance;

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: {} });
    jest.spyOn(axios, 'create').mockReturnValue({
      ...axiosMock,
      get: mockGet,
    } as unknown as AxiosInstance);
    await throttledGetDataFromApi('/users');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: {} });
    jest.spyOn(axios, 'create').mockReturnValue({
      ...axiosMock,
      get: mockGet,
    } as unknown as AxiosInstance);
    await throttledGetDataFromApi('/users');
    expect(mockGet).toHaveBeenCalledWith('/users');
  });

  test('should return response data', async () => {
    const data = { id: 1 };
    const mockGet = jest.fn().mockResolvedValue({ data });
    jest.spyOn(axios, 'create').mockReturnValue({
      ...axiosMock,
      get: mockGet,
    } as unknown as AxiosInstance);
    const daat = await throttledGetDataFromApi('/users');
    await expect(mockGet()).resolves.toEqual({ data });
    expect(daat).toEqual(data);
  });
});
