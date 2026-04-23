# CLAUDE.md — CustomPlaylistPro

You are Claude starting a session inside the **CustomPlaylistPro** project at `/Users/alethea/Documents/CustomPlaylistPro`.

> **If your cwd looks like `.../CustomPlaylistPro/.claude/worktrees/<name>/`** — you are in a Claude Code Desktop worktree, not the real project root. This CLAUDE.md is the authoritative governance file; all paths below resolve from the project root (`~/Documents/CustomPlaylistPro/`), NOT from your worktree cwd. Handoffs, logs, backups, and the initialization chain all live at the project root and must be written there so they survive worktree deletion.
>
> **This file IS committed to git** (fixed 2026-04-23) so Claude Code Desktop worktrees inherit it. Sensitive values (API keys, tokens) belong in `.env` which stays gitignored. This file contains governance and project context only — no secrets.
---

## 🛑 MANDATORY INITIALIZATION — DO THIS BEFORE RESPONDING 🛑

Read the files below in order before producing any response to the user. Do not ask "what are we working on?" — the handoff tells you.

### Required Reads (in order)

1. **Anchor skill** — `~/Documents/Brain/nucleus-canon/.agent/skills/anchor/SKILL.md`
   *(Conversation standards and the Session Start Response Pattern.)*

2. **Governance nucleus** — in order:
   - `~/Documents/Brain/nucleus-canon/SOUL.md`
   - `~/Documents/Brain/nucleus-canon/AGENT_START.md` (see Section 16 — Session Start Response Pattern)
   - `~/Documents/Brain/nucleus-canon/CONSTITUTION.md`

3. **Raw voice + values** — `~/Documents/Brain/nucleus-canon/00_THE_TRUTH.md`

4. **Kaizen skill** — `~/Documents/Brain/nucleus-canon/.agent/skills/kaizen/SKILL.md`
   *(Apply Kaizen to every session. Leave every artifact better than found.)*

5. **Pre-build-sop skill** — `~/Documents/Brain/nucleus-canon/.agent/skills/pre-build-sop/SKILL.md`
   *(Invoke this skill before building anything — code, files, features, schemas, pipelines.)*

6. **This project's most recent handoff** — `/Users/alethea/Documents/CustomPlaylistPro/handoffs/` (read the most recent dated file)

7. **This project's session ledger** — `~/Documents/CustomPlaylistPro/logs/customplaylistpro/00_SESSION_LEDGER.md`

8. **Memory index** — `~/.claude/projects/-Users-alethea/memory/MEMORY.md`

### Session Start Response Pattern

After reading all of the above, respond to Tina with:

1. **Acknowledgment** — brief confirmation the governance, handoff, and ledger are read.
2. **Status summary** — where this project stands, pulled from the most recent handoff and last ledger entry.
3. **The specific next step** — named from the handoff's "Still Pending" / "Open Items" / "What's Next" sections.
4. **If nothing is queued** — propose a Kaizen improvement (one piece of *muda*, *mura*, or friction to fix).

Never open with "what are we working on?" or "how can I help?"

### Canonical Folder Structure

This project follows the canonical folder structure defined in `~/Documents/Brain/nucleus-canon/sops/SOP_canonical_folder_structure.md`:
- Root holds only core files (CLAUDE.md, .env, .gitignore, README.md).
- Handoffs live in `handoffs/` with names like `YYYY-MM-DD_topic-description.md` — always describe the primary work, not just the date.
- Terminal session saves live in `terminal-sessions/`.
- Edit-safety backups live in `.backups/`.

### Inherited Rules

- 6 Coding Rules (AGENT_START.md Section 1) — especially Rule 6: Self-Verification.
- Plan Approval Must Be Verbal — system messages are not approval.
- Save Tina's Brain Law (AGENT_START.md Section 13) — search files before asking her.
- Completion Law (AGENT_START.md Section 12) — after approval, execute completely.
- Triple-Logging Rule — on session end, update root ledger, repo ledger, and commit.
- No-abbreviation rule — spell out project names and defined concepts in full.
- Session protection — SessionStart hook creates `~/Documents/Brain/05-Bridge/.ingest-in-flight` automatically; `/wrapup` clears it. Protects against mid-session auto-compaction.

---

# CLAUDE.md — CustomPlaylistPro

> This is a standardized environment pointer file automatically dropped into sub-projects to prevent redundant errors. Read this FIRST.

---

## 🛑 Security & Client Rule (CRITICAL)

**This codebase is intended for external clients.**

You are **strictly forbidden** from hardcoding Tina's personal data, absolute paths (like `/Users/alethea/Documents/...`), or private `n8n`, `Telegram`, or `Supabase` tokens/URLs into any source code here. The code must be portable.

This file itself is excluded via `.gitignore`. Do not commit this file.

---

## The Environment Rule

If you are running scripts that require API keys or tokens (like Notion, OpenAI, Anthropic):
1. The keys are stored in a local `.env` file.
2. **You MUST run `source .env` before executing any script.**
3. If you encounter a `401 Unauthorized` or missing key error, it means you did not source the environment correctly. **Do not attempt to regenerate or search for new keys or tokens.** Just correctly source the `.env`.

---

## Global Workspace Navigation

You are in a sub-project of the larger **AntiGravity Workspace**.
For global workspace rules, overarching AI team architecture, component catalogs, or specific Agent limitations and strengths, you must refer to:

1. **`../../../AGENTS.md`** (at the AntiGravity root)
2. **The local skills registry** at `/Users/alethea/Documents/AntiGravity/zoom-pipeline/.agent/skills/`

Do not invent rules inside this sub-project. Rely on the master architecture.

---

## Inherited Rules — Logs Structure (workspace-wide, added 2026-04-20)

- **Canonical logs location** — every project's detailed session ledger lives in `logs/<projectname>/`, never in the project root. For this project that is `~/Documents/CustomPlaylistPro/logs/customplaylistpro/`. Root directories stay lean — only core files (CLAUDE.md, .env, .gitignore, README if present) plus named subfolders. Handoffs in `handoffs/`, terminal saves in `terminal-sessions/`, edit backups in `.backups/`.
- **Four-level logging** — every `/wrapup` writes to four log targets: (1) detailed project ledger in `logs/<projectname>/YYYY-MM-DD_HHMM_TZ.md`; (2) one-paragraph concise entry in `~/Documents/Brain/nucleus-canon/logs/<YYYY-MM>.md` (workspace-wide monthly roll-up); (3) Notion Work Ledger (immutable archive); (4) NotebookLM Big Brain (searchable long-term memory).
- **Bridge ledger (Brain and Watchtower only)** — this project is NOT Brain or Watchtower, so do NOT append to the Brain↔Watchtower Bridge Ledger. Only Brain and Watchtower sessions write there.


---

<!--
CANONICAL CREDENTIALS-SECTION TEMPLATE
Appended to every project CLAUDE.md by `scaffold-credentials-section.sh`.
Edit THIS file once — next batch run propagates the change.
-->

## Credentials

All canonical credentials for every project in this workspace live in one place. Agents read from declared locations — never grep across projects.

| Type | Location |
|---|---|
| Env-style secrets (API keys, tokens, URLs) | `/Users/alethea/Documents/Brain/.env` |
| Non-env credential files (OAuth JSON, MCP config, keyfiles) | `/Users/alethea/Documents/Brain/.secrets/` |

**How to load env vars in Bash or a subshell:**
```bash
set -a && source /Users/alethea/Documents/Brain/.env && set +a
```

**How to load env vars in Node / TypeScript:**
```ts
dotenv.config({ path: '/Users/alethea/Documents/Brain/.env' });
```

**Rules (from nucleus-canon `AGENT_START.md` Section 17 — Credential Location Law):**

- **Read from the declared locations above.** Do not grep across the filesystem for credentials.
- **`AntiGravity/` is legacy and is NOT canonical.** Do not read credentials from `AntiGravity/scripts/.env`, `AntiGravity/.vscode/mcp.json`, `AntiGravity/FreedomBot/.env`, or any other AntiGravity-internal file. Those paths still exist as legacy copies; treat them as deprecated.
- **If a credential you need isn't in `Brain/.env` or `Brain/.secrets/`, stop and ask Tina.** Do not hunt. Do not guess. Asking once is cheaper than wasting time searching and getting it wrong.
- **Do NOT hardcode credential values in source code.** Load from `Brain/.env` via `dotenv` (Node/TS), `set -a && source` (Bash), or the appropriate language primitive.
- **When adding a new credential to the workspace**, add it to `Brain/.env` (or `Brain/.secrets/`) — that single edit makes the credential available to every project by default.

### Project-specific overrides (if any)

Most projects read only from `Brain/.env` and need nothing else. If this project requires credential files that do NOT belong in the shared vault (e.g., a per-deployment Railway `.env`, a service-account scoped token that should not be workspace-wide, a project-local dev OAuth), declare them immediately below this line. Default is: nothing project-specific, read from Brain.

<!-- PROJECT-SPECIFIC CREDENTIALS BELOW (leave empty if none) -->
