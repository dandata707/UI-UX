# Platform Guidelines

Use as a quick reference. If the user's codebase or brand guide conflicts, follow the user and note the deviation.

## Common to both
- Design on a base canvas of 390 x 844 (iPhone) and 360 x 800 (Android); verify at 320 wide and on small/large font scale.
- Respect safe areas (notch, status bar, home indicator, gesture bar, display cutouts).
- Touch targets: iOS >= 44 x 44 pt; Android >= 48 x 48 dp; at least 8 dp between adjacent targets.
- Thumb-zone: place primary actions in the lower half; avoid critical actions in top corners.
- Support portrait first; define landscape/tablet behavior only if requested.
- Text contrast: WCAG AA (4.5:1 body, 3:1 large text and UI components); aim for AAA on body when feasible.
- Never rely on color alone; pair with icon, text, or pattern.
- Support screen readers (VoiceOver / TalkBack): meaningful labels, logical focus order, grouped elements.
- Support dynamic type / font scaling and reduce-motion settings.

## iOS (Human Interface Guidelines)
- Navigation: tab bar at bottom (up to 5), navigation stack with large titles, swipe-back gesture must work.
- Sheets: modal sheets with detents; grabber visible.
- Controls: native-feeling switches, segmented controls, context menus.
- Typography: SF Pro via system; use Dynamic Type text styles.
- Icons: SF Symbols style (outlined, consistent weight).
- Haptics for confirmations; avoid overuse.
- Status bar and home indicator areas stay clear of interactive content.

## Android (Material Design 3)
- Navigation: bottom navigation bar (3-5) or navigation rail on larger screens; top app bar; predictive back gesture.
- Components: FAB for primary creation action, snackbars, bottom sheets, tonal buttons.
- Typography: Roboto or user font; sp units.
- Shape: rounded corners per M3 shape scale; elevation via tonal color.
- Support edge-to-edge layouts with proper insets.
- Dynamic color (Material You) only if the user opts in; otherwise use the user's brand palette.

## Cross-platform (React Native / Flutter)
- Use platform-adaptive components where behavior differs (back gesture, pickers, alerts).
- Keep one token source; map to platform theme objects (RN: theme context; Flutter: `ThemeData` + `ThemeExtension`).
- Test on both OSs for font rendering, safe areas, and keyboard behavior.

## Forms and input
- Keep forms short; one column; label every field; show errors inline next to the field and summarize at top for long forms.
- Use input masks, appropriate keyboards, and autofill.
- Keep the primary action visible above the keyboard.

## Performance-minded UI
- Prefer vector icons; compress images; define image aspect ratios to avoid layout shifts.
- Use skeletons for loads > 300 ms; avoid blocking spinners for the whole screen.
