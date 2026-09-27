# Calculator App

A clean, modern web calculator built with plain **HTML, CSS and JavaScript** — no frameworks, no build tools, no dependencies.

**Try it live:** https://melleeyyy.github.io/calculator-app/

## Features

- Basic operations: add, subtract, multiply, divide
- Percent, sign toggle, decimal point
- Backspace and clear-all (AC)
- Full **keyboard support** (digits, operators, Enter, Escape, Backspace)
- Chained calculations — `2 + 3 + 4` evaluates as you go
- Divide-by-zero handled with a clear error state
- Responsive dark UI for mobile and desktop
- Safe evaluation — a small state machine, **no `eval()`**

## Keyboard shortcuts

| Key | Action |
|---|---|
| `0–9`, `.` | Digit / decimal point |
| `+` `-` `*` `/` | Operators |
| `Enter` or `=` | Calculate |
| `Escape` | Clear all |
| `Backspace` | Delete last digit |

## Run it locally

```bash
git clone https://github.com/melleeyyy/calculator-app.git
```

Then open `index.html` in any browser (keep the `css/` and `js/` folders next to it). The calculator runs entirely offline.

## Structure

```
calculator-app/
├── index.html      # markup and layout
├── css/style.css   # theme and responsive rules
├── js/script.js    # calculator logic + keyboard handling
└── LICENSE         # MIT
```

## License

MIT — see [LICENSE](LICENSE). Issues and pull requests are welcome.
