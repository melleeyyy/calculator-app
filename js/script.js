/* =====================================================
   Calculator — script.js
   A simple, safe state-machine calculator (no eval).
   Supports: + - x / % +/- . AC backspace, keyboard input
   ===================================================== */

(function () {
  "use strict";

  // ---------- State ----------
  var state = {
    current: "0",      // the number currently being typed
    previous: null,    // stored operand (number)
    operator: null,    // "add" | "subtract" | "multiply" | "divide"
    overwrite: false,  // true => next digit replaces the display
  };

  var historyEl = document.getElementById("history");
  var displayEl = document.getElementById("display");

  var OPERATOR_SYMBOLS = {
    add: "+",
    subtract: "-",
    multiply: "x",
    divide: "\u00F7",
  };

  // ---------- Helpers ----------

  function formatNumber(num) {
    // Avoid long floating point tails: 0.1 + 0.2 => 0.3
    var rounded = Math.round(num * 1e12) / 1e12;
    return String(rounded);
  }

  function compute(a, b, operator) {
    switch (operator) {
      case "add": return a + b;
      case "subtract": return a - b;
      case "multiply": return a * b;
      case "divide":
        if (b === 0) return null; // divide-by-zero handled by caller
        return a / b;
      default: return b;
    }
  }

  function render() {
    displayEl.textContent = state.current;

    if (state.previous !== null && state.operator) {
      historyEl.textContent =
        formatNumber(state.previous) + " " + OPERATOR_SYMBOLS[state.operator];
    } else {
      historyEl.innerHTML = "&nbsp;";
    }
  }

  // ---------- Actions ----------

  function inputDigit(digit) {
    if (state.overwrite || state.current === "0") {
      state.current = digit;
      state.overwrite = false;
    } else if (state.current.replace("-", "").replace(".", "").length < 12) {
      state.current += digit;
    }
  }

  function inputDecimal() {
    if (state.overwrite) {
      state.current = "0.";
      state.overwrite = false;
    } else if (state.current.indexOf(".") === -1) {
      state.current += ".";
    }
  }

  function chooseOperator(operator) {
    var value = parseFloat(state.current);

    // Chain calculations: 2 + 3 + ... evaluates the first pair first
    if (state.previous !== null && state.operator && !state.overwrite) {
      var result = compute(state.previous, value, state.operator);
      if (result === null) {
        showError();
        return;
      }
      state.previous = result;
      state.current = formatNumber(result);
    } else {
      state.previous = value;
    }

    state.operator = operator;
    state.overwrite = true;
    highlightOperator(operator);
  }

  function equals() {
    if (state.previous === null || state.operator === null) return;

    var value = parseFloat(state.current);
    var result = compute(state.previous, value, state.operator);

    if (result === null) {
      showError();
      return;
    }

    historyEl.textContent =
      formatNumber(state.previous) + " " +
      OPERATOR_SYMBOLS[state.operator] + " " +
      formatNumber(value) + " =";

    state.current = formatNumber(result);
    state.previous = null;
    state.operator = null;
    state.overwrite = true;
    highlightOperator(null);
  }

  function clearAll() {
    state.current = "0";
    state.previous = null;
    state.operator = null;
    state.overwrite = false;
    highlightOperator(null);
  }

  function toggleSign() {
    if (state.current === "0") return;
    state.current = state.current.charAt(0) === "-"
      ? state.current.slice(1)
      : "-" + state.current;
  }

  function percent() {
    var value = parseFloat(state.current) / 100;
    state.current = formatNumber(value);
    state.overwrite = true;
  }

  function backspace() {
    if (state.overwrite) return;
    if (state.current.length > 1) {
      state.current = state.current.slice(0, -1);
    } else {
      state.current = "0";
    }
  }

  function showError() {
    state.current = "Error";
    state.previous = null;
    state.operator = null;
    state.overwrite = true;
    highlightOperator(null);
  }

  function highlightOperator(operator) {
    var buttons = document.querySelectorAll(".key--operator");
    buttons.forEach(function (btn) {
      btn.classList.toggle(
        "is-selected",
        operator !== null && btn.dataset.operator === operator
      );
    });
  }

  // ---------- UI wiring ----------

  document.querySelector(".keypad").addEventListener("click", function (event) {
    var button = event.target.closest("button");
    if (!button) return;

    if (button.dataset.digit && !button.dataset.action) {
      inputDigit(button.dataset.digit);
    } else if (button.dataset.action === "decimal") {
      inputDecimal();
    } else if (button.dataset.operator) {
      chooseOperator(button.dataset.operator);
    } else if (button.dataset.action === "equals") {
      equals();
    } else if (button.dataset.action === "clear") {
      clearAll();
    } else if (button.dataset.action === "sign") {
      toggleSign();
    } else if (button.dataset.action === "percent") {
      percent();
    } else if (button.dataset.action === "backspace") {
      backspace();
    }

    render();
  });

  // ---------- Keyboard support ----------

  document.addEventListener("keydown", function (event) {
    var key = event.key;

    if (/^[0-9]$/.test(key)) inputDigit(key);
    else if (key === ".") inputDecimal();
    else if (key === "+") chooseOperator("add");
    else if (key === "-") chooseOperator("subtract");
    else if (key === "*" || key === "x") chooseOperator("multiply");
    else if (key === "/") { event.preventDefault(); chooseOperator("divide"); }
    else if (key === "Enter" || key === "=") { event.preventDefault(); equals(); }
    else if (key === "Escape") clearAll();
    else if (key === "Backspace") backspace();
    else return;

    render();
  });

  // ---------- Start ----------

  render();
})();
