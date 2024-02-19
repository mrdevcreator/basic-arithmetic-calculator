display = document.getElementById("showclac");

clearshowcalc = () => {
  display.value = "";
};

appendNumber = (number) => {
  display.value += number;
};

chooseOperation = (operation) => {
  display.value += operation;
};

goback = () => {
  display.value = display.value.slice(0, -1);
};

compute = () => {
  try {
    display.value = evaluateExpression(display.value); //We can use eval() function to evaluate the expression easily but for practice I make the evaluateExpression function for manually evaluate the expression.
  } catch (e) {
    display.value = e.message;
  }
};

evaluateExpression = (expression) => {
  if (!expression.trim()) {
    throw new Error("Expression is empty");
  }

  const lastChar = expression.slice(-1);
  if (["+", "-", "*", "/"].includes(lastChar)) {
    throw new Error("Invalid expression");
  }

  const tokens = expression.match(/(\d+(\.\d+)?|\.\d+|[\+\-\*\/])/g);

  if (!tokens) {
    throw new Error("Invalid expression");
  }

  const values = [];
  const ops = [];
  const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
  };

  for (const token of tokens) {
    if (!isNaN(parseFloat(token))) {
      values.push(parseFloat(token));
    } else {
      while (
        ops.length &&
        precedence[token] <= precedence[ops[ops.length - 1]]
      ) {
        processOperation(values, ops);
      }
      ops.push(token);
    }
  }

  while (ops.length) {
    processOperation(values, ops);
  }

  return values.pop();
};

processOperation = (values, ops) => {
  let rightVal = values.pop();
  let leftVal = values.pop();
  let op = ops.pop();

  switch (op) {
    case "+":
      values.push(leftVal + rightVal);
      break;
    case "-":
      values.push(leftVal - rightVal);
      break;
    case "*":
      values.push(leftVal * rightVal);
      break;
    case "/":
      if (rightVal !== 0) {
        values.push(leftVal / rightVal);
      } else {
        throw new Error("Division by zero");
      }
      break;
    default:
      throw new Error("Unknown operator");
  }
};
