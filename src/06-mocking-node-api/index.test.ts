// Uncomment the code below and write your tests
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import path from 'node:path';
import fs from 'node:fs';
import fs_promise from 'node:fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const time = 100;
    const callback = jest.fn();
    const spyTimeout = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, time);
    expect(spyTimeout).toHaveBeenCalledWith(callback, time);
  });

  test('should call callback only after timeout', () => {
    const time = 1000;
    const callback = jest.fn();

    doStuffByTimeout(callback, time);
    jest.advanceTimersByTime(999);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const time = 100;
    const callback = jest.fn();
    const spyInterval = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, time);
    expect(spyInterval).toHaveBeenCalledWith(callback, time);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const time = 100;
    const callback = jest.fn();

    doStuffByInterval(callback, time);
    jest.advanceTimersByTime(50);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(300);
    expect(callback).toHaveBeenCalledTimes(4);
  });
});

describe('readFileAsynchronously', () => {
  jest.mock('node:path', () => ({
    ...jest.requireActual('node:path'),
    join: jest.fn(),
  }));

  jest.mock('node:fs/promises', () => ({
    ...jest.requireActual('node:fs/promises'),
    readFile: jest.fn(),
  }));

  jest.mock('node:fs', () => ({
    ...jest.requireActual('node:fs'),
    existsSync: jest.fn(),
  }));

  afterAll(() => {
    jest.unmock('node:path');
    jest.unmock('node:fs/promises');
    jest.unmock('node:fs');
  });

  test('should call join with pathToFile', async () => {
    const spyJoin = jest.spyOn(path, 'join');
    const path_to_file = '/node.js';
    await readFileAsynchronously(path_to_file);
    expect(spyJoin).toHaveBeenCalledWith(expect.anything(), path_to_file);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    await expect(readFileAsynchronously('file.js')).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    const file_content = 'file content';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs_promise, 'readFile').mockResolvedValue(file_content);
    await expect(readFileAsynchronously('file.js')).resolves.toEqual(
      file_content,
    );
  });
});
