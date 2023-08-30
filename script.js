// create a class of calculator this will make it easier to reuse, keeps the code better organized and can be used as a parent class for more specialized classes later
class Calculator { 
  //constructor sets up the initial state  see extra example in obsidian: class/constuctor/constuctor example
  //these inital state can be hard code or as here a user input: we will follow 20 + 30 here
  // story:         20                           30
  constructor(previousOperationText, currentOperationText) {
    // So now for every instance of the class it knows which one its referencing 
    //story    20
    this.previousOperationText = previousOperationText;
    //story    30
    this.currentOperationText = currentOperationText;
    //this initializes the current operation and clears out the screen for use
    this.clear()
  }

  clear(){
    this.currentOperation = ''
    this.previousOperation = ''
    this.operation = undefined
  }

  //this add the digits the entered digit is the button pressed innertext
  addDigits(enteredDigit){
    //if the thing entered is a '.' and if in the current operation already has a '.' return nothing so it doesn't allow for another '.' to be placed
    if (enteredDigit === '.' && this.currentOperation.includes('.')) return
    //turn what has just been entered into a string so you can make a mulitdigit number and not just do an //addition to numbers and 
    this.currentOperation = this.currentOperation.toString() + enteredDigit.toString()
  }

  // 
  // story    +
  whichOp(operation){
    //stops the excecuion when nothing is in the calulator as by default it lets us do that
    if (this.currentOperation === '') 
    return
    //so if theres something in previous and somthing in current doTheCalc!
    if (this.previousOperation !== ''){
      this.doTheCalc()
    }
    //set the operation so it knows what operation is used by which instance
    //story +
    this.operation = operation
    //move the current to the previous as its done with
    this.previousOperation = this.currentOperation
    //clear out the current spot
    this.currentOperation = ''
  }

  doTheCalc(){
    //initialise the result
    let computation
    //change the string into float to do the calculation
    const prev = parseFloat(this.previousOperation)
    const current = parseFloat(this.currentOperation)
    // if nothing entered dont let compute work
    if (isNaN(prev) || isNaN(current)) return
    //switch on the operation 
    // story +
    switch (this.operation) {
      case '+':
        //story        20      30
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        //remember these chars come from the html so cant put a / sign here it must be ÷
        computation = prev / current
        break
      default:
        return
    }
    //shows the result
    this.currentOperation = computation
    //reset the operation bit
    this.operation = undefined
    //clear the previous bit
    this.previousOperation = ''
  }

  //all this func does is create the commas
  createCommas(enteredDigit){
    //if we do this we can split it on the '.' charachter
    const stringNum = enteredDigit.toString()
    //we need this to be a number so has to be parsed then grab the first array of the split
    const intDigits = parseFloat(stringNum.split('.')[0])
    //grab second part
    const decimalDigits = stringNum.split('.')[1]
    // instance the display
    let integerDisplay
    // if nothing input or just a decimal 
    if (isNaN(intDigits)){
        integerDisplay = ''
        //if integer value is entered
    } else {

      integerDisplay = intDigits.toLocaleString('en', {
        //this means no more decimals after commas? 
        maximumFractionDigits: 0})
    }
    //if decimal digits exist do this
    if (decimalDigits != null){
      //display the whole thing
      return `${integerDisplay}.${decimalDigits}`
    } else {
      //or if no decimat digits just the integer
      return integerDisplay
    }
    
    
    
    // //PART1: we need to do the above as we cant parse things like decimal places so intergers and floats have to be split
    // //converting to number becuase atm its a string as we did thaat so we could make a multidigit num
    // const floatNumber = parseFloat(enteredDigit)
    // //more telling js what it isnt to prevent users putting non numbers in
    // if (isNaN(floatNumber)) return ''
    // //this will return any changes made to the entered digits in this case putting commas between them and make it avalible for other func to use
    // return floatNumber.toLocaleString('en')
  }

  updateScreen(){
    // this puts them on the screen
    //shows the current digits added
    //wrapping this.currentOperation this.createCommas making it anargument done last and therefore all changes wil lbe reflected on the display
    this.currentOperationText.innerText = this.createCommas(this.currentOperation)
    // its saying if there isnt nothing so if there is a =/-* opertation in use concantenate the op with the previous operation text 
    if (this.operation != null){
       //shows the previous digits added
       //again having the this.createCommas allows now for changes in create commas to be reflected on the screen
      this.previousOperationText.innerText = 
      `${this.createCommas(this.previousOperation)} ${this.operation}`
    } else {
      this.previousOperationText.innerText = ''
    }
   
  }

}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperationText = document.querySelector('[data-previous-operand]')
const currentOperationText = document.querySelector('[data-current-operand]')

//create instance of the calculator class
const calculator = new Calculator(previousOperationText, currentOperationText)

//looping over every single button and 
numberButtons.forEach(button => {
  //attaching a 'click' event listener to each one that initiates a function 
  button.addEventListener('click', (e) => {
    //story     2 then 0 and 3 and then 0
    calculator.addDigits(button.innerText)
    calculator.updateScreen()
  })  
})

//same as for buttons
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    //story                      +
    calculator.whichOp(button.innerText)
    calculator.updateScreen()
  })
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateScreen()
})

equalsButton.addEventListener('click', button => {
  calculator.doTheCalc()
  calculator.updateScreen()
})