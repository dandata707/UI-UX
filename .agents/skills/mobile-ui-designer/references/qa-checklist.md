# QA Checklist

Run through this before delivering. Report only failures and the fixes applied.

## Inputs fidelity
- [ ] Every user-provided color, font, size, radius, and spacing value appears unchanged in the tokens
- [ ] All user-provided copy is used verbatim; missing copy is marked `TODO_CONTENT`
- [ ] Each token has a `source` (`user` / `derived` / `default`)

## Color & contrast
- [ ] `scripts/check_contrast.py` reports no FAIL
- [ ] Text on primary fills meets 4.5:1 (or 3:1 for large text)
- [ ] Focus indicators meet 3:1 against adjacent colors
- [ ] Dark theme checked separately
- [ ] Meaning is never conveyed by color alone

## Layout
- [ ] Safe areas respected on all screens
- [ ] Touch targets meet platform minimums
- [ ] Spacing uses only scale values
- [ ] Layout survives 130-200% text scale and a 320 pt-wide screen
- [ ] Long text, long names, and empty values handled (truncate / wrap rules defined)

## Components & states
- [ ] Each interactive component has default, pressed, focused, disabled states
- [ ] Forms have error, helper, and success states
- [ ] Each data screen has loading, empty, error, (offline) states
- [ ] One clear primary action per screen

## Navigation & behavior
- [ ] Every screen has an entry and an exit; back behavior defined
- [ ] Gestures documented and have visible alternatives
- [ ] Destructive actions require confirmation or offer undo

## Accessibility
- [ ] Labels for icon-only controls
- [ ] Logical focus/reading order
- [ ] Reduce-motion alternative defined
- [ ] Sufficient line length and line height for body text

## Code (if generated)
- [ ] No hard-coded colors, sizes, or strings outside the theme/localization files
- [ ] Theme switches between light/dark without restart
- [ ] Components are reusable and documented with props
- [ ] Project builds / lints (run the project's commands when available)
