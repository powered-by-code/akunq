import { createElement, Fragment } from 'react';
import type { ReactNode } from 'react';
import campTranslation from './translation.json';
import devTranslation from './translation.dev.json';

type NestedObject = { [key: string]: unknown };

// Add new variants here — route and import are all you need.
const variants: [string, NestedObject][] = [
  ['camp', campTranslation as NestedObject],
];

const defaultData = devTranslation as NestedObject;

// Exported so App.tsx can auto-generate routes
export const variantSlugs = variants.map(([slug]) => slug);

function getTranslation(): NestedObject {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname.replace(/^\//, '').split('/')[0];
    for (const [slug, data] of variants) {
      if (path === slug) return data;
    }
  }
  return defaultData;
}

function getNestedValue(obj: NestedObject, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as NestedObject)) {
      return (acc as NestedObject)[key];
    }
    return undefined;
  }, obj);
}

export function t(key: string): string {
  const value = getNestedValue(getTranslation(), key);
  if (typeof value === 'string') return value;
  return key;
}

export function tArray<T = unknown>(key: string): T[] {
  const value = getNestedValue(getTranslation(), key);
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
  const value = getNestedValue(getTranslation(), key);
  if (typeof value === 'number') return value;
  return 0;
}
