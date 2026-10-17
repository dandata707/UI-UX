# Design Tokens

Tokens are the single source of truth. Screens and components reference token names only, never raw values.

## Token layers

1. **Primitive**: raw values (`color.indigo.500 = #4F46E5`)
2. **Semantic**: role-based aliases (`color.action.primary -> color.indigo.500`)
3. **Component**: optional per-component overrides (`button.primary.bg -> color.action.primary`)

Semantic tokens are what get switched between light and dark themes.

## Color

### Deriving a tonal ramp from the user's brand color
Generate a 10-step ramp (50, 100, 200, ..., 900) by keeping hue constant and varying lightness in HSL/OKLCH:

| Step | Approx. lightness (HSL) |
|------|------------------------|
| 50 | 96% |
| 100 | 92% |
| 200 | 84% |
| 300 | 72% |
| 400 | 60% |
| 500 | brand color (user value, kept exactly) |
| 600 | -8% from 500 |
| 700 | -16% from 500 |
| 800 | -24% from 500 |
| 900 | -32% from 500 |

Always anchor step 500 to the exact user-supplied hex, even if lightness differs from the table.

### Required semantic color tokens

```
color.bg.base            app background
color.bg.surface         cards, sheets
color.bg.surfaceAlt      subtle sections
color.bg.overlay         scrims (alpha)
color.text.primary
color.text.secondary
color.text.disabled
color.text.onPrimary     text on primary fills
color.text.link
color.border.default
color.border.strong
color.border.focus
color.action.primary
color.action.primaryPressed
color.action.primaryDisabled
color.action.secondary
color.feedback.success / warning / error / info
color.feedback.<name>.bg     tinted background for banners
```

### Dark mode
- Do not invert colors. Re-map semantic tokens to darker primitives.
- Base background: near-black with a hint of brand hue (L about 8-12%), not pure `#000000` unless the user requests OLED black.
- Raise surfaces with lighter tonal steps (surface +4%, surfaceAlt +8% lightness) instead of shadows.
- Desaturate large brand-colored areas slightly (about 10-15%) to avoid vibration; keep the exact brand color for small accents when contrast allows.
- If the user's brand color fails contrast on dark backgrounds, use the 300 or 400 step for text/icons in dark mode and report it.

## Typography

Token shape: `font.family`, `font.size`, `font.weight`, `font.lineHeight`, `font.letterSpacing`.

Default scale (base 16, ratio about 1.2, adjust to user base size):

| Token | Size | Line height | Weight |
|-------|------|-------------|--------|
| display | 34 | 40 | 700 |
| title1 | 28 | 34 | 700 |
| title2 | 22 | 28 | 600 |
| title3 | 20 | 26 | 600 |
| body | 16 | 24 | 400 |
| bodyStrong | 16 | 24 | 600 |
| callout | 15 | 22 | 400 |
| caption | 13 | 18 | 400 |
| overline | 11 | 16 | 600 (uppercase, +0.5 tracking) |

Rules:
- Use sp / Dynamic Type so text scales with user settings; layouts must tolerate 130%+ scale.
- Maximum 2 font families; 3-4 weights.
- Body text never below 14; captions never below 11-12.

## Spacing
Base unit `u` (default 4). Scale: `space.1=u, 2=2u, 3=3u, 4=4u, 6=6u, 8=8u, 12=12u`. Screen horizontal margin: `space.4` (16) on phones; 24 on tablets. Use the scale only; no arbitrary values.

## Radius
`radius.sm`, `radius.md`, `radius.lg`, `radius.pill`. Nested elements use `outerRadius - padding` for the inner radius.

## Elevation
Levels 0-4. Light theme: shadow (y-offset, blur, alpha) per level. Dark theme: tonal surface overlay. Store both in tokens.

## Motion
- `motion.duration.fast=120ms`, `base=200ms`, `slow=320ms`
- `motion.easing.standard = cubic-bezier(0.2, 0, 0, 1)`, `enter = cubic-bezier(0, 0, 0.2, 1)`, `exit = cubic-bezier(0.4, 0, 1, 1)`
- Respect "reduce motion" system setting.

## Sizing / touch
- `size.touchMin = 44` (iOS) / `48` (Android)
- `size.icon.sm/md/lg = 16/24/32`
- `size.control.height = 48` (buttons, inputs)

## Output file
Write `design-tokens.json` following `assets/tokens.template.json`. Every leaf value: `{ "value": ..., "source": "user|derived|default" }` where practical.
