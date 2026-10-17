# Intake Form

Collect inputs from the user in ONE message. Skip any item the user already provided. Present the form as a short numbered list and let the user answer in any format (free text is fine).

## A. Required

| # | Input | Example |
|---|-------|---------|
| 1 | App name + one-line purpose | "FitTrack - daily workout logging" |
| 2 | Platform | iOS / Android / both / React Native / Flutter / SwiftUI / Compose |
| 3 | Primary brand color (hex) | `#4F46E5` |
| 4 | Screens or user flow | "Onboarding, Home, Workout detail, Profile" |

## B. Strongly recommended (fallbacks exist)

| # | Input | Default if missing |
|---|-------|--------------------|
| 5 | Secondary / accent color | Derived: analogous hue, +30 degrees |
| 6 | Neutral palette base | Cool gray derived from primary hue at 4% saturation |
| 7 | Semantic colors (success / warning / error / info) | `#16A34A` / `#D97706` / `#DC2626` / `#2563EB` (adjusted for contrast) |
| 8 | Theme mode | Light + Dark |
| 9 | Font family (heading / body) | System font (SF Pro on iOS, Roboto on Android) |
| 10 | Type scale base size | 16 |
| 11 | Spacing base unit | 4 (scale: 4, 8, 12, 16, 24, 32, 48) |
| 12 | Corner radius style | Medium: 8 (small) / 12 (medium) / 16 (large) / 999 (pill) |
| 13 | Elevation style | Soft shadows (light) / tonal overlays (dark) |
| 14 | Screen content / copy | Marked `TODO_CONTENT`; never invent brand copy |
| 15 | Icon style | Outlined, 24 px, 1.5-2 px stroke |
| 16 | Navigation pattern | Bottom tab bar (max 5 items) + stack navigation |

## C. Optional

- Brand personality (3 adjectives, e.g. "calm, trustworthy, modern")
- Reference apps or screenshots the user likes
- Target audience (age, accessibility needs)
- Imagery / illustration style
- Motion preference (minimal / standard / expressive)
- Localization (languages, RTL support)
- Existing codebase path (to match conventions)

## Rules

- Validate hex codes (`#RGB` or `#RRGGBB`); normalize to 6-digit uppercase.
- If the user gives a color name instead of a hex (e.g. "ocean blue"), propose a hex and confirm.
- If the user supplies a font that needs a license or is not bundled, ask them to confirm availability and name a fallback.
- Record every answer in `design-tokens.json` with a `source` field: `user`, `derived`, or `default`.
- If the user says "you decide" for any item, treat it as `derived` or `default` and note the reasoning in one line.
