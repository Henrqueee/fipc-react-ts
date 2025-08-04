import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock do localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock do window.confirm
Object.defineProperty(window, 'confirm', {
  value: vi.fn(() => true),
});

// Mock do window.alert
Object.defineProperty(window, 'alert', {
  value: vi.fn(),
});