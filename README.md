# Calculator App

A clean, modern web calculator built with plain **HTML, CSS and JavaScript** — no frameworks, no build tools, no dependencies.

## Features

- Basic operations: add, subtract, multiply, divide
- Percent, sign toggle, decimal point
- Backspace (⌫) and clear all (AC)
- Full **keyboard support** (digits, `+ - * /`, Enter, Escape, Backspace)
- Chained calculations (e.g. `2 + 3 + 4` evaluates as you go)
- Divide-by-zero handling with an error state
- Responsive, dark UI that works on mobile and desktop
- Safe evaluation — a small state machine, **no `eval()`**

## Getting Started

No installation needed. Just open `index.html` in any modern browser:

1. Download or clone this repository:
   ```bash
   git clone https://github.com/melleeyyy/calculator-app.git
   ```
2. Open `index.html` (double-click it, or right-click → Open With → your browser).

That's it — the calculator runs entirely offline.

## Project Structure

```
calculator-app/
├── index.html        # Page markup and calculator layout
├── css/
│   └── style.css     # Theme, layout and responsive rules
├── js/
│   └── script.js     # Calculator logic and keyboard handling
└── README.md
```

## Keyboard Shortcuts

| Key | Action |
| --- | --- |
| `0–9` | Enter digit |
| `.` | Decimal point |
| `+` `-` `*` `/` | Operators |
| `Enter` or `=` | Calculate |
| `Escape` | Clear all |
| `Backspace` | Delete last digit |

## Contributing

Issues and pull requests are welcome.

## License

No license file yet — add one (e.g. MIT) if you plan to share this code.
