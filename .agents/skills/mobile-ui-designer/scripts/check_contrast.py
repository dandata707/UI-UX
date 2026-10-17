#!/usr/bin/env python3
"""Check WCAG contrast for color pairs defined in a design-tokens.json file.

Usage:
    python check_contrast.py design-tokens.json

Reads `color.semantic.light` and `color.semantic.dark` plus `contrastPairs`
(each pair: name, fg, bg, min). Prints a table and exits with code 1 if any
pair fails. Colors may be #RGB, #RRGGBB, or rgba(r,g,b,a). Alpha is ignored
(no compositing is attempted), so use opaque colors for text pairs.
"""
import json
import re
import sys


def parse_color(value):
    value = value.strip()
    m = re.fullmatch(r"#([0-9a-fA-F]{3})", value)
    if m:
        h = m.group(1)
        return tuple(int(c * 2, 16) for c in h)
    m = re.fullmatch(r"#([0-9a-fA-F]{6})", value)
    if m:
        h = m.group(1)
        return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))
    m = re.fullmatch(r"rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*[\d.]+)?\s*\)", value)
    if m:
        return tuple(int(m.group(i)) for i in (1, 2, 3))
    raise ValueError(f"Unsupported color format: {value!r}")


def luminance(rgb):
    def channel(c):
        c = c / 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

    r, g, b = (channel(c) for c in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def ratio(fg, bg):
    l1, l2 = luminance(fg), luminance(bg)
    hi, lo = max(l1, l2), min(l1, l2)
    return (hi + 0.05) / (lo + 0.05)


def main(path):
    with open(path, encoding="utf-8") as f:
        tokens = json.load(f)

    semantic = tokens.get("color", {}).get("semantic", {})
    pairs = tokens.get("contrastPairs", [])
    if not semantic or not pairs:
        print("No semantic colors or contrastPairs found.")
        return 2

    failures = 0
    checked = 0
    for theme in ("light", "dark"):
        palette = semantic.get(theme)
        if not palette:
            continue
        print(f"\n== {theme.upper()} THEME ==")
        print(f"{'Pair':<30}{'Ratio':>8}{'Min':>7}  Result")
        for pair in pairs:
            fg_val = palette.get(pair["fg"])
            bg_val = palette.get(pair["bg"])
            if not fg_val or not bg_val:
                print(f"{pair['name']:<30}{'-':>8}{pair['min']:>7}  SKIP (missing token)")
                continue
            try:
                r = ratio(parse_color(fg_val), parse_color(bg_val))
            except ValueError as e:
                print(f"{pair['name']:<30}{'-':>8}{pair['min']:>7}  SKIP ({e})")
                continue
            checked += 1
            ok = r >= pair["min"]
            if not ok:
                failures += 1
            print(f"{pair['name']:<30}{r:>8.2f}{pair['min']:>7}  {'PASS' if ok else 'FAIL'}")

    print(f"\nChecked {checked} pairs, {failures} failure(s).")
    return 1 if failures else 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(2)
    sys.exit(main(sys.argv[1]))
