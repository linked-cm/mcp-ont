# AGENTS.md — @linked.cm/mcp-ont

The vocabulary of connected agents for Linked apps. An ontology package (`"linked": {"kind": "ontology"}`): exactly one ontology, no shapes, components or backend. The code that uses it is `@linked.cm/mcp`.

Staged in the **linked-cm** org (npm scope `@linked.cm`) pending review; it moves to linked-fw only after approval. Local only until its GitHub repository is made.

## Do not change without a migration

- The namespace `https://linked.cm/ont/mcp/` (`mcp:`): stored connections and declarations use it.
- `linkedPackage('@linked.cm/mcp-ont')` in `src/package.ts`.

## Rules

- The data is `src/data/mcp.ttl`. Change it, then run `npx linked generate-ontology`; never edit the generated `src/ontologies/mcp*.ts`.
- Package docs say what, never which app.
- Releases go through changesets (`npx changeset`).

## Agent docs (`docs/`)

Same convention as linked-fw packages: `docs/ideas`, `docs/plans`, `docs/reports`, numbered with a 3-digit prefix, each starting with YAML frontmatter (`summary`, `packages`). Use the `workflow` skill for any change.
