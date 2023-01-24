import { it, expect } from 'vitest';
import { encode, decode } from './FirebaseId';

it('encodes all forbidden charactes', () => {
  const encoded = encode('.$#[]/');
  expect(encoded).not.toContain('.');
  expect(encoded).not.toContain('$');
  expect(encoded).not.toContain('#');
  expect(encoded).not.toContain('[');
  expect(encoded).not.toContain(']');
  expect(encoded).not.toContain(`/`);
});

it('preserves ASCII characters', () => {
  const asciiIds = ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog'];
  for (const id of asciiIds) {
    expect(encode(id)).toBe(id);
  }
});

it('encodes email addresses', () => {
  expect(encode('admin@example.com')).toBe('admin%40example%2Ecom');
  expect(encode('disposable.style.email.with+symbol@example.com')).toBe(
    'disposable%2Estyle%2Eemail%2Ewith%2Bsymbol%40example%2Ecom'
  );
  expect(encode('test/test@example.com')).toBe('test%2Ftest%40example%2Ecom');
});

it('encodes IPv4 addresses', () => {
  expect(encode('127.0.0.1')).toBe('127%2E0%2E0%2E1');
});

it('decodes encoded IDs', () => {
  expect(decode('admin%40example%2Ecom')).toBe('admin@example.com');
  expect(decode('a%2Eb%2Ec%2Ed%2Fe%2Ef%2Eg%2Eh')).toBe('a.b.c.d/e.f.g.h');
});

it('preserves the original value when encoded and then decoded', () => {
  const samples = [
    '02/10/2013.$[]#/%234_-!@#$%^&*()0];:\'"`\\=/?+|',
    'コラボキット',
    'jäätelö',
    'https://www.collabkit.dev/',
    '%24%24%24%24',
  ];
  for (const id of samples) {
    const encoded = encode(id);
    expect(decode(encoded)).toBe(id);
    expect(encoded).not.toContain('.');
    expect(encoded).not.toContain('$');
    expect(encoded).not.toContain('#');
    expect(encoded).not.toContain('[');
    expect(encoded).not.toContain(']');
    expect(encoded).not.toContain(`/`);
  }
});
