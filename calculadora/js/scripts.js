const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    addDigit(digit) {  
        console.log(digit);
        //check
        if  (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    //processar todas operações
    processOperation(operation) {
        //check if empty
        if(this.currentOperationText.innerText === "") {
            //change operation
            if(this.previousOperationText.innerText !== "") {
                   this.changeOperation(operation);
            }
            return;
        }
        
        //get value
        let operationValue;
        let previous = +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
              operationValue = previous + current;
              this.updateScreen(operationValue, operation, current, previous);
              break;
            case "-":
              operationValue = previous - current;
              this.updateScreen(operationValue, operation, current, previous);
              break;
            case "*":
              operationValue = previous * current;
              this.updateScreen(operationValue, operation, current, previous);
              break;
            case "/":
              operationValue = previous / current;
              this.updateScreen(operationValue, operation, current, previous);
              break;
            case "DEL":
              this.processDelOperator();
              break;
            case "CE":
              this.processClearCurrentOperator();
              break;
            case "C":
              this.processClearOperator();
              break;
            case "=":
              this.processEqualOperator();
              break;
            default:
              return;
          }
        }

    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {
        
        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            //checar se valor é zero
            if(previous === 0) {
                operationValue = current;
            }

            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    //change math operation
    changeOperation(operation){
        const mathOperations = ["*", "/", "+", "-"]

        if(!mathOperations.includes(operation)) {
            return
        }

        this.previousOperationText.innerText = 
        this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    processDelOperator() {
        this.currentOperationText.innerText =
          this.currentOperationText.innerText.slice(0, -1);
      }
    
      // Clear current operation
      processClearCurrentOperator() {
        this.currentOperationText.innerText = "";
      }
    
      // Clear all operations
      processClearOperator() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
      }
    
      // Process an operation
      processEqualOperator() {
        let operation = this.previousOperationText.innerText.split(" ")[1];
    
        this.processOperation(operation);
      }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      console.log(value);
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});