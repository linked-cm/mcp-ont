import { readFileSync } from 'node:fs';
import { packageName } from '../src/package';

describe('@linked.cm/mcp-ont', () => {
  it('is the package it says it is', () => {
    expect(packageName).toBe('@linked.cm/mcp-ont');
  });

  it('declares its one ontology at https://linked.cm/ont/mcp/', () => {
    const turtle = readFileSync(new URL('../src/data/mcp.ttl', import.meta.url), 'utf8');
    expect(turtle).toContain('<https://linked.cm/ont/mcp/> a owl:Ontology');
  });
});
