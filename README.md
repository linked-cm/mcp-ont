# @linked.cm/mcp-ont

The vocabulary of connected agents for Linked apps (`https://linked.cm/ont/mcp/`, prefix `mcp:`).

A person can connect an agent to a Linked app. The agent then reads, changes and calls the app's shapes **as that person**, within what the person and every layer above them allow. This package names those things as data, so they can be declared, extended, validated and translated:

- **Connection** — one agent connected by one person, with where it may work and what it may do.
- **Capability** — one thing an agent may do: a kind (read, create, update, delete, call) on shapes, on callables, or on operations an app declares.
- **Layer** — one party that grants capabilities; an agent's effective capability is what every layer grants.
- **Preset** — a named bundle of capabilities a layer can grant.
- **Refusal reasons** — why a request was refused, each with a label.

The code that uses it is [`@linked.cm/mcp`](../mcp).

## Status

Staged in linked-cm (npm scope `@linked.cm`); it moves to linked-fw once approved. Local only for now.

## Develop

```sh
npm install
npx linked generate-ontology   # after changing src/data/mcp.ttl
npm run build
npm test
```

## Changelog

See `CHANGELOG.md`.
