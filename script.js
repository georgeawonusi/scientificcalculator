const display = document.getElementById("display");
let history = [];
let showingHistory = false;
let degreeMode = true;

function appendValue(value) {
  if (value === "(" && display.value.length > 0 && /[\dπe)]/.test(display.value.slice(-1))) {
    display.value += "*" + value;
  } else if (value === "π") {
    display.value += Math.PI.toFixed(8);
  } else if (value === "e") {
    display.value += Math.E.toFixed(8);
  } else if (value === "√") {
    display.value += "Math.sqrt(";
  } else if (value === "^") {
    display.value += "**2";
  } else if (["sin(", "cos(", "tan(", "log("].includes(value)) {
    display.value += value;
  } else {
    display.value += value;
  }
}

function clearDisplay() {
  display.value = "";
  showingHistory = false;
  updateDisplayStyle(false);
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function toggleSign() {
  try {
    if (display.value) {
      display.value = String(-1 * eval(display.value));
    }
  } catch {
    display.value = "Null";
  }
}

function calculate() {
  try {
    let expr = display.value;
    expr = expr.replace(/sin\(/g, "mySin(");
    expr = expr.replace(/cos\(/g, "myCos(");
    expr = expr.replace(/tan\(/g, "myTan(");
    expr = expr.replace(/log\(/g, "Math.log10(");
    const result = eval(expr);
    if (history.length >= 3) history.shift();
    history.push(`${expr} =${result}`);
    display.value = result;
    showingHistory = false;
    updateDisplayStyle(false);
  } catch {
    display.value = "Null";
  }
}

function toggleHistory() {
  if (!showingHistory) {
    display.value = history.join(" | ");
  } else {
    display.value = "";
  }
  showingHistory = !showingHistory;
  updateDisplayStyle(showingHistory);
}

function updateDisplayStyle(show) {
  display.style.background = show ? "orange" : "white";
  display.style.color = show ? "black" : "black";
}

function toggleDegreeMode() {
  degreeMode = !degreeMode;
  document.getElementById("modeToggle").textContent = degreeMode ? "Deg" : "Rad";
}

function mySin(x) {
  return degreeMode ? Math.sin(x * Math.PI / 180) : Math.sin(x);
}
function myCos(x) {
  return degreeMode ? Math.cos(x * Math.PI / 180) : Math.cos(x);
}
function myTan(x) {
  return degreeMode ? Math.tan(x * Math.PI / 180) : Math.tan(x);
}
