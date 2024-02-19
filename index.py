import re

def evaluate_expression(expression):
    if not expression.strip():
        raise ValueError("Expression is empty")

    last_char = expression[-1]
    if last_char in ["+", "-", "*", "/"]:
        raise ValueError("Invalid expression")

    tokens = re.findall(r'(\d+(\.\d+)?|\.\d+|[\+\-\*\/])', expression)

    if not tokens:
        raise ValueError("Invalid expression")

    values = []
    ops = []
    precedence = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2,
    }

    for token in tokens:
        token = token[0] 
        if token.isdigit() or token[0] == '.':
            values.append(float(token))
        else:
            while ops and precedence[token] <= precedence[ops[-1]]:
                process_operation(values, ops)
            ops.append(token)

    while ops:
        process_operation(values, ops)

    return values.pop()


def process_operation(values, ops):
    right_val = values.pop()
    left_val = values.pop()
    op = ops.pop()

    if op == "+":
        values.append(left_val + right_val)
    elif op == "-":
        values.append(left_val - right_val)
    elif op == "*":
        values.append(left_val * right_val)
    elif op == "/":
        if right_val != 0:
            values.append(left_val / right_val)
        else:
            raise ValueError("Division by zero")
    else:
        raise ValueError("Unknown operator")

# Example usage:
expression = "7*7+2/2-1"
result = evaluate_expression(expression)
print("Result:", result)
