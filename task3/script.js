// Select the display and all buttons
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = ""; // To track the current input
let previousInput = ""; // To track the previous input
let operator = ""; // To track the current operator

// Add event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");
        const action = button.getAttribute("data-action");

        // Handle clear action
        if (action === "clear") {
            currentInput = "";
            previousInput = "";
            operator = "";
            display.textContent = "0";
            return;
        }

        // Handle delete action
        if (action === "delete") {
            currentInput = currentInput.slice(0, -1);
            display.textContent = currentInput || "0";
            return;
        }

        // Handle calculation
        if (action === "calculate") {
            if (currentInput && previousInput && operator) {
                calculate();
                operator = ""; // Reset operator after calculation
            }
            return;
        }

        // Handle operators
        if (["+", "-", "*", "÷"].includes(value)) {
            if (currentInput) {
                operator = value === "÷" ? "/" : value; // Handle division symbol
                previousInput = currentInput;
                currentInput = "";
            }
            return;
        }

        // Handle number and dot input
        if (value === "." && currentInput.includes(".")) {
            return; // Prevent multiple dots
        }

        currentInput += value;
        display.textContent = currentInput;
    });
});

// Perform the calculation
function calculate() {
    let result;
    try {
        result = eval(`${previousInput} ${operator} ${currentInput}`);
    } catch (e) {
        result = "Error";
    }
    display.textContent = result;
    currentInput = result;
}
