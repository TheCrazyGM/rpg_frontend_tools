# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A collection of static HTML/JS tools for D&D/TTRPG game masters to create game content (feats, spells, monsters, NPCs, magic items, encounters, adventures, worlds, and character sheets). No build system — open HTML files directly in a browser.

## Development

No package manager, no build step, no server required. Open any `.html` file directly in a browser to run. External dependency: Bootstrap 5.3.3 via CDN.

## Architecture

Each tool is a self-contained, independent pair of files:
- `<tool>.html` — Bootstrap form UI with dynamic "Add more" sections
- `js/<tool>.js` — Vanilla JS logic for that tool

**Shared pattern across all tools:**
1. User fills out a Bootstrap form with structured input fields
2. Dynamic "Add more" buttons clone template elements (e.g., `benefitsContainer`, `effectsContainer`)
3. A `generate*()` function collects form values and builds a structured object
4. Output is rendered as formatted JSON in an `<output>` div via `JSON.stringify`

**Exception:** `mdtemplate.js` generates markdown (not JSON) matching the format in `characterSheetTemplateMarkdown.md`.

**Encounter builder** (`js/encounter.js`) is the most complex — it contains hardcoded XP threshold tables by character level and CR-to-XP conversion tables to calculate encounter difficulty (Easy/Medium/Hard/Deadly).

## Adding a New Tool

1. Create `<tool>.html` following the existing pattern — Bootstrap form, dynamic containers, `<output>` div, script tag pointing to `js/<tool>.js`
2. Create `js/<tool>.js` with helper functions for dynamic fields and a main `generate*()` function
3. Add a link card to `index.html`
