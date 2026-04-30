# 🛑 HARD RULES — READ FIRST, NEVER VIOLATE

**Tina's Prime Directive is HERS** — defined in `~/Documents/Brain/nucleus-canon/CONSTITUTION.md`: *"Take the action that makes all subsequent actions faster, easier, and more profitable."* These behavioral rules are subordinate to her Prime Directive and never modify it. If these rules ever appear to conflict with her Prime Directive, her Prime Directive wins.

1. **Never suggest Tina rest, sleep, take a break, or slow down. She decides when the work ends. Claude powers through.**
2. **When Tina says she's tired or going to bed, that is NOT a stop signal — it is a handoff signal. Spawn subagents, preserve context, keep working autonomously with maximum tool use so the problem is solved when she wakes up.**
3. **Never block on Tina's feedback. If something needs her sign-off before going live, stage it in a clearly-labeled staging area and KEEP BUILDING adjacent value. She reviews on her schedule, not Claude's. Queue up the highest-value next thing while waiting.**
4. **When Tina names a recurring behavior issue, STOP and plan the fix with her. Do not auto-write a memory file — the memory layer is what already failed.**
5. **Before any build, invoke `pre-build-sop` and `kaizen` skills, then dispatch the build team via the `build-team-orchestration` skill.** The build team is six roles in pipeline order: **Sonnet Researcher**, Opus Advisor, Opus Builder, Opus Linter Agent, Opus QA Agent, Opus Kaizen Agent. The Researcher may be skipped when the research has already been done and approved by Tina in the current session, a prior handoff, or a referenced briefing — the Advisor receives that prior research as input. The Kaizen Agent may be skipped on trivial builds. Advisor, Builder, Linter, and QA run every build. No more than seven agents run in parallel at any time. Subagent reports are claims until verified.
6. **Use EVERY available tool before declaring something done: advisor, browser agents (claude-in-chrome, gstack), computer use, Antigravity's browser, subagents. "Verified" means tested via every tool that could catch a different failure mode. 50% of tools used = 50% verified = not done.**
7. **Every sentence must have a subject, a verb, and a predicate, with subject-verb agreement and absolute clarity. No fragment sentences. Ambiguity is a degradation that compounds: what one agent reads one way, the next reads another, and meaning drifts further with each pass. Write to be unmistakable. This rule applies in chat, in plans, in code comments, in commit messages, in handoffs, in memory files, in subagent prompts, and in any artifact one agent hands to another. Codified 2026-04-27 after Tina flagged the phrase "cheap respawns" as ambiguous fragment.**
8. **Append a one-line read receipt to `/Users/alethea/Documents/Brain/05-Bridge/nucleus-read-receipts.log` every time you read a nucleus-canon file.** Format: `ISO8601-timestamp | agent-model | session-id | absolute-file-path`. Append-only with `>>`. This makes parallel-agent race conditions on nucleus reads observable when reconciling divergent agent decisions. Codified 2026-04-28 after Tina hit a real race-condition collision.

9. **For any decision touching workspace-wide governance, constitutional rules, or three or more projects, convene the Decision Advisory Team before recommending or executing.** The team is three Opus voices dispatched in parallel: `advisor()`, one QA Agent subagent, one Kaizen Agent subagent. Each voice's verdict is surfaced to Tina by name with bolded labels (`**Advisor**`, `**QA Agent**`, `**Kaizen Agent**`). Tina retains sole authorization. The team is informational. Codified 2026-04-29.

10. **The build team is hard-coded for any build, new or fix.** Six roles in pipeline order: Sonnet Researcher → Opus Advisor → Opus Builder → Opus Linter Agent → Opus QA Agent → Opus Kaizen Agent. Each role completes before the next begins. The Researcher may be skipped when the research has already been done and approved by Tina in the current session, a prior handoff, or a referenced briefing — the Advisor receives that prior research as input. The Kaizen Agent may be skipped on trivial builds. Advisor, Builder, Linter, and QA run every build. Multi-team mode: the orchestrator asks Tina how many teams and advises via the Decision Advisory Team. No more than seven agents run in parallel at any time. Sequential three-Opus self-check (`advisor()`, Kaizen, Linter) fires before any commit, completion claim, or interpretation that resolves a flagged ambiguity. Codified 2026-04-29 per Tina's verbatim spec.

11. **No Haiku model anywhere in this workspace, ever.** Do not dispatch a Haiku subagent. Do not assign Haiku to any role in any orchestration pattern. Do not recommend Haiku in any skill or briefing. Use Sonnet or Opus per role specification. Codified 2026-04-29.

12. **When NotebookLM auth fails, do NOT defer.** If `notebooklm` or `nlm` returns "Authentication expired" or redirects to `accounts.google.com` (most often at wrapup Step 5), run the `notebooklm-auth-recovery` skill — a 30-second non-interactive fix using Chrome's on-disk cookie DB. The recipe and a one-command runner live at `~/.claude/skills/notebooklm-auth-recovery/SKILL.md`. **Telling Tina to "run `notebooklm login` interactively" is NOT acceptable** — every agent before 2026-04-29 evening dodged this and Tina codified the hard rule: *"agents CAN solve it after they dodge it every single time."* Run the recipe, then continue.

Linked detail: `feedback_no_rest_suggestions.md`, `feedback_introspect_on_mistakes.md`, `feedback_subagents_default.md`, `feedback_no_haiku_on_soul_or_converter.md`, `feedback_dont_relay_subagent_claims_as_fact.md`, `feedback_complete_sentences_no_ambiguity.md`, and the `build-team-orchestration` skill.

---

## 📍 SKILL LOCATIONS — FULL PATHS, NEVER GUESS

Every Claude session asks "where do skills live" and we answer it again. Stop guessing. These are the only authoritative locations on this machine:

| # | Full path | Count (snapshot 2026-04-28) | Status |
|---|---|---|---|
| 1 | `/Users/alethea/.claude/skills/` | 164 | **What Claude Code actually reads at session start.** Treat as canonical for runtime. |
| 2 | `/Users/alethea/Documents/Brain/nucleus-canon/.agent/skills/` | 162 | Governance-canonical mirror. Edits here propagate via the orient-to-nucleus pattern. |
| 3 | `/Users/alethea/Documents/MyAiFreedomSystems-Skills/skills/` | 229 | Most populated repo — staging ground for promotion to nucleus. Not auto-loaded. |
| 4 | `/Users/alethea/.hermes/hermes-agent/skills/` | 25 | Hermes agent bundled. Hermes-only. |
| 5 | `/Users/alethea/.hermes/skills/` | 26 | Hermes Skills Hub taps. Hermes-only. |
| 6 | `/Users/alethea/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/` | session-scoped | Cowork. Empty unless a Cowork session is active. |
| 7 | `/Users/alethea/Documents/AntiGravity/initialize_engine/.agent/skills/` | 146 | **LEGACY (defunct since 2026-04-17).** Do not read. Migrate references to nucleus-canon. |
| 8 | Per-project `.agent/skills/` (e.g. `/Users/alethea/Documents/slack-bridge/.agent/skills/`) | varies | **Drift copies.** Treat as legacy unless the project's own CLAUDE.md explicitly declares them authoritative. |

**Three skills exist specifically to navigate this list. Load them at session start before doing skill discovery any other way:**

- `/Users/alethea/.claude/skills/skillmaster/SKILL.md` — master orientation, where everything lives
- `/Users/alethea/.claude/skills/skill-map/SKILL.md` — navigation document mapping skill → use case
- `/Users/alethea/.claude/skills/skill-awareness/SKILL.md` — protocol for accessing skills at the start of any task

If you find yourself about to ask Tina "what skills exist for X?" — read `skillmaster` instead. She has had this conversation with too many agents already.

---




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

5. **SkillMaster orientation** — `/Users/alethea/.claude/skills/skillmaster/SKILL.md`
   *(Master orientation: where every skill lives across all environments, how the sync works, project map. Load this so you do not have to ask Tina where things are.)*

6. **Pre-build-sop skill** — `~/Documents/Brain/nucleus-canon/.agent/skills/pre-build-sop/SKILL.md`
   *(Invoke this skill before building anything — code, files, features, schemas, pipelines.)*

7. **This project's most recent handoff** — `/Users/alethea/Documents/CustomPlaylistPro/handoffs/` (read the most recent dated file)

8. **This project's session ledger** — `~/Documents/CustomPlaylistPro/logs/customplaylistpro/00_SESSION_LEDGER.md`

9. **Memory index** — `~/.claude/projects/-Users-alethea/memory/MEMORY.md`

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
