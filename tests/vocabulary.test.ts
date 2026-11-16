import { readFileSync } from 'node:fs';
import { Parser, Store } from 'n3';
import * as mcp from '../src/ontologies/mcp';

const NS = 'https://linked.cm/ont/mcp/';
const RDF_TYPE = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
const LABEL = 'http://www.w3.org/2000/01/rdf-schema#label';
const store = new Store(new Parser().parse(readFileSync(new URL('../src/data/mcp.ttl', import.meta.url), 'utf8')));
const englishLabel = (iri: string) =>
  store.getObjects(iri, LABEL, null).find((o) => o.termType === 'Literal' && (o as any).language === 'en')?.value;
const membersOf = (cls: string) => store.getSubjects(RDF_TYPE, NS + cls, null).map((s) => s.value);

describe('the mcp vocabulary', () => {
  it('has the terms the code names, as generated accessors', () => {
    for (const term of [
      'Connection', 'person', 'agentName', 'maker', 'via', 'scope', 'grants', 'settings',
      'keyHash', 'keyHint', 'connectedAt', 'lastActedAt', 'disconnectedAt',
      'Capability', 'kind', 'onShape', 'onCallable', 'coversOperation', 'actionPhrase', 'order',
      'Read', 'Create', 'Update', 'Delete', 'Call', 'Perform',
      'Layer', 'ConnectionLayer', 'Preset', 'grantsCapability',
      'RefusalReason', 'NotGranted', 'OutOfScope', 'UnknownTool', 'BadInput', 'RateLimited', 'RefusedByApp',
    ]) {
      expect((mcp as Record<string, { id: string }>)[term]?.id, term).toBe(NS + term);
      expect(store.getQuads(NS + term, null, null, null).length, `${term} is declared`).toBeGreaterThan(0);
    }
  });

  it('labels every refusal reason and every kind in English, so a refusal can be said', () => {
    const reasons = membersOf('RefusalReason');
    const kinds = membersOf('Kind');
    expect(reasons.length).toBe(6);
    expect(kinds.length).toBe(6);
    for (const iri of [...reasons, ...kinds]) expect(englishLabel(iri), iri).toBeTruthy();
  });

  it('labels every class and property', () => {
    const declared = new Set(
      store.getQuads(null, RDF_TYPE, null, null)
        .filter((q) => /#(Class|ObjectProperty|DatatypeProperty)$/.test(q.object.value))
        .map((q) => q.subject.value)
    );
    expect(declared.size).toBeGreaterThan(20);
    for (const iri of declared) expect(englishLabel(iri), iri).toBeTruthy();
  });

  it('ships one layer of its own: what the person gave the connection', () => {
    expect(membersOf('Layer')).toEqual([NS + 'ConnectionLayer']);
  });
});
