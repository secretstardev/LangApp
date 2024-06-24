import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve an item from localStorage', () => {
    const key = 'testKey';
    const value = { test: 'value' };
    service.setItem(key, value);
    expect(service.getItem(key)).toEqual(value);
  });

  it('should remove an item from localStorage', () => {
    const key = 'testKey';
    const value = { test: 'value' };
    service.setItem(key, value);
    service.removeItem(key);
    expect(service.getItem(key)).toBeNull();
  });

  it('should clear all items from localStorage', () => {
    const key1 = 'testKey1';
    const value1 = { test: 'value1' };
    const key2 = 'testKey2';
    const value2 = { test: 'value2' };
    service.setItem(key1, value1);
    service.setItem(key2, value2);
    service.clear();
    expect(service.getItem(key1)).toBeNull();
    expect(service.getItem(key2)).toBeNull();
  });
});
