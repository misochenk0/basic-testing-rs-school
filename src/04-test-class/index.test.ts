// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(100).getBalance()).toEqual(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(100).withdraw(200)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(100);
    const anotherAccount = getBankAccount(200);
    expect(() => account.transfer(200, anotherAccount)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(200, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(200);
    expect(account.deposit(200).getBalance()).toEqual(400);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(200);
    expect(account.withdraw(200).getBalance()).toEqual(0);
  });

  test('should transfer money', () => {
    const account = getBankAccount(300);
    const anotherAccount = getBankAccount(200);
    expect(account.transfer(200, anotherAccount).getBalance()).toEqual(100);
    expect(anotherAccount.getBalance()).toEqual(400);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(200);
    const balance = await account.fetchBalance();
    // If fetchBalance returned null - fetchBalance failed
    if (balance === null) return
    expect(balance).toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 200;
    const account = getBankAccount(initialBalance);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(12);

    await expect(account.synchronizeBalance()).resolves.toBeUndefined();
    expect(account.getBalance()).toBe(12);
    expect(account.getBalance()).not.toBe(initialBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(200);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
  });
});
