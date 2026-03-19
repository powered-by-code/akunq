import { createElement, Fragment } from 'react';
import type { ReactNode } from 'react';
import translation from './translation.json';

type NestedObject = { [key: string]: unknown };

function getNestedValue(obj: NestedObject, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as NestedObject)) {
      return (acc as NestedObject)[key];
    }
    return undefined;
  }, obj);
}

export function t(key: string): string {
  const value = getNestedValue(translation as NestedObject, key);
  if (typeof value === 'string') return value;
  return key;
}

export function tArray<T = unknown>(key: string): T[] {
  const value = getNestedValue(translation as NestedObject, key);
  if (Array.isArray(value)) return value as T[];
  return [];
}

export function tHtml(key: string): ReactNode {
  const value = t(key);
  if (!value.includes('\n')) return value;
  const parts = value.split('\n');
  return createElement(Fragment, null, ...parts.flatMap((part, i) =>
    i < parts.length - 1 ? [part, createElement('br', { key: i })] : [part]
  ));
}

export function tNumber(key: string): number {
  const value = getNestedValue(translation as NestedObject, key);
  if (typeof value === 'number') return value;
  return 0;
}
