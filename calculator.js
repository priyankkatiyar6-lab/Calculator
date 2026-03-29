
        class Calculator {
            constructor(previousOperandTextElement, currentOperandTextElement) {
                this.previousOperandTextElement = previousOperandTextElement;
                this.currentOperandTextElement = currentOperandTextElement;
                this.clear();
            }

            clear() {
                this.currentOperand = '';
                this.previousOperand = '';
                this.operation = undefined;
            }

            deleteLast() {
                this.currentOperand = this.currentOperand.toString().slice(0, -1);
            }

            appendNumber(number) {
                if (number === '.' && this.currentOperand.includes('.')) return;
                this.currentOperand = this.currentOperand.toString() + number.toString();
            }

            chooseOperation(operation) {
                if (this.currentOperand === '') return;
                if (this.previousOperand !== '') {
                    this.calculate();
                }
                this.operation = operation;
                this.previousOperand = this.currentOperand;
                this.currentOperand = '';
            }

            calculate() {
                let result;
                const prev = parseFloat(this.previousOperand);
                const current = parseFloat(this.currentOperand);

                if (isNaN(prev) || isNaN(current)) return;

                switch (this.operation) {
                    case '+':
                        result = prev + current;
                        break;
                    case '-':
                        result = prev - current;
                        break;
                    case '*':
                        result = prev * current;
                        break;
                    case '/':
                        result = prev / current;
                        break;
                    default:
                        return;
                }

                this.currentOperand = result.toString();
                this.operation = undefined;
                this.previousOperand = '';
            }

            getDisplayNumber(number) {
                const stringNumber = number.toString();
                const integerDigits = parseFloat(stringNumber.split('.')[0]);
                const decimalDigits = stringNumber.split('.')[1];
                let integerDisplay;
                
                if (isNaN(integerDigits)) {
                    integerDisplay = '';
                } else {
                    integerDisplay = integerDigits.toLocaleString('en', {
                        maximumFractionDigits: 0
                    });
                }

                if (decimalDigits != null) {
                    return `${integerDisplay}.${decimalDigits}`;
                } else {
                    return integerDisplay;
                }
            }

            updateDisplay() {
                this.currentOperandTextElement.innerText = 
                    this.getDisplayNumber(this.currentOperand) || '0';
                if (this.operation != null) {
                    this.previousOperandTextElement.innerText = 
                        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
                } else {
                    this.previousOperandTextElement.innerText = '';
                }
            }
        }

        const previousOperandTextElement = document.getElementById('previousOperand');
        const currentOperandTextElement = document.getElementById('currentOperand');
        const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

        function clearAll() {
            calculator.clear();
            calculator.updateDisplay();
        }

        function deleteLast() {
            calculator.deleteLast();
            calculator.updateDisplay();
        }

        function appendNumber(number) {
            if (number === '+' || number === '-' || number === '*' || number === '/') {
                calculator.chooseOperation(number);
            } else {
                calculator.appendNumber(number);
            }
            calculator.updateDisplay();
        }

        function calculate() {
            calculator.calculate();
            calculator.updateDisplay();
        }

        document.addEventListener('keydown', (e) => {
            if (e.key >= 0 && e.key <= 9) {
                appendNumber(e.key);
            } else if (e.key === '.') {
                appendNumber('.');
            } else if (e.key === '+' || e.key === '-') {
                appendNumber(e.key);
            } else if (e.key === '*') {
                appendNumber('/');
            } else if (e.key === '/') {
                appendNumber('*');
            } else if (e.key === 'Enter' || e.key === '=') {
                calculate();
            } else if (e.key === 'Backspace') {
                deleteLast();
            } else if (e.key.toLowerCase() === 'c') {
                clearAll();
            }
        });
    