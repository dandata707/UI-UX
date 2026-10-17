# Component Specifications

Specify only components used by the requested screens. Every spec references tokens; include all states.

## Spec template

```
### <ComponentName>
Purpose:
Variants:
Anatomy: (ordered list of parts)
Sizing: height, min width, padding (tokens)
Typography: token
Colors per state: default / pressed / focused / disabled / error / selected
Radius / border / elevation:
Behavior: tap, long-press, swipe, keyboard
Accessibility: label, role, min target, focus order
```

## Baseline components

### Button
- Variants: primary (filled), secondary (tonal/outlined), tertiary (text), destructive
- Sizes: large (height `size.control.height`), medium (40), small (32, but touch target stays >= `size.touchMin` via padding/hitSlop)
- States: default, pressed (`action.primaryPressed`), focused (focus ring 2 px `border.focus`), disabled (`action.primaryDisabled`, text `text.disabled`), loading (spinner replaces label, width locked)
- Label: `bodyStrong`, sentence case, max 2 words preferred

### Text field
- Anatomy: label (above or floating), input, helper text, leading/trailing icon, error message
- States: default, focused, filled, disabled, error, success
- Height `size.control.height`; border `border.default`, focused `border.focus` (2 px)
- Use correct keyboard type, autofill hints, and return key action

### Card
- Surface `bg.surface`, radius `radius.md`/`lg`, padding `space.4`, elevation level 1 (or 1 px border in dark)
- Variants: static, tappable (pressed overlay 8%), media-top

### List item
- Heights: single-line 56, two-line 72, three-line 88
- Leading (icon/avatar), content, trailing (value/chevron/switch); divider inset to content start

### Top app bar
- Height 56 (Android) / 44 + large title (iOS); safe-area aware
- Title, back/close, up to 2 trailing actions

### Bottom tab bar
- 3-5 items; icon (24) + label (`caption`); active uses `action.primary`; badge support
- Height 56 + bottom safe area inset

### Bottom sheet / dialog
- Sheet: drag handle, radius `radius.lg` top corners, scrim `bg.overlay`
- Dialog: max width 280-560, title, body, up to 2 actions (destructive on the left on Android, per platform norm)

### Chips, badges, tags
- Chip height 32, pill radius, selected state uses tinted primary background

### Switch, checkbox, radio, slider
- Follow platform-native look unless the user requests custom; always >= `size.touchMin`

### Feedback
- Toast/snackbar (auto-dismiss 4 s, action optional), inline banner, progress (linear/circular), skeleton loaders

### Empty / error / offline states
Each includes: illustration or icon (user-supplied or simple icon), title, one-line explanation, one primary action. Copy from the user or `TODO_CONTENT`.

## Rules
- Never create a component variant that is not used.
- Keep one primary action per screen.
- Icon-only buttons need an accessible label.
- Provide all text in tokens/strings so localization is possible.
