// https://learn.freecodecamp.org/front-end-libraries/front-end-libraries-projects/build-a-javascript-calculator

function ButtonGroup({onClick}) {
  return (
    <div>
      <button id='clear' value='clear' onClick={onClick}>AC</button>
      <button id='divide' value='/' onClick={onClick}>/</button>
      <button id='multiply' onClick={onClick} value='x'>X</button>
      <button id='seven' value='7' onClick={onClick}>7</button>
      <button id='eight' value='8' onClick={onClick}>8</button>
      <button id='nine' value='9' onClick={onClick}>9</button>
      <button id='subtract' onClick={onClick} value='-'>-</button>
      <button id='four' value='4' onClick={onClick}>4</button>
      <button id='five' value='5' onClick={onClick}>5</button>
      <button id='six' value='6' onClick={onClick}>6</button>
      <button id='add' value='+' onClick={onClick}>+</button>
      <div id='bottom'>
        <div id='bottom1'>
          <button id='one' value='1' onClick={onClick}>1</button>
          <button id='two' value='2' onClick={onClick}>2</button>
          <button id='three' value='3' onClick={onClick}>3</button>
          <button id='zero' value='0' onClick={onClick}>0</button>
          <button id='decimal' value='decimal' onClick={onClick}>.</button>
        </div>
          <button id='equals' onClick={onClick} value='='>=</button>
      </div>
  </div>
  );
}

class Application extends React.Component {
  constructor() {
    super();
    this.state = {
      curValue: '0',
      lastCalculate: '',
      preValue: 0,
      lastInputNaN: true,
      hasDecimal: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
  }
  
  handleCalculate(cal) {
    if (this.state.lastInputNaN) {
      this.setState({
        lastCalculate: cal
      });
      return;
    }
    let newPreValue = 0;
    const curValue = Number(this.state.curValue);
    const preValue = Number(this.state.preValue);
    const lastCalculate = this.state.lastCalculate;
    if (lastCalculate === '+') {
      newPreValue= curValue + preValue;
      console.log(newPreValue) ;
    } else if (lastCalculate === '-') {
      newPreValue = preValue - curValue;
    } else if (lastCalculate === '/') {
      newPreValue = preValue / curValue;
    } else if (lastCalculate === 'x') {
      newPreValue = preValue * curValue;
    } else {
      newPreValue = curValue;
    }
    console.log(newPreValue);
    if (cal === '=') {
      this.setState({
        preValue: 0,
        curValue: newPreValue,
        lastCalculate: '',
        lastInputNaN: false
      });
      return;
    } 
    
   this.setState({
      preValue: newPreValue,
      lastCalculate: cal,
      lastInputNaN: true
    });
  }
  
  handleClear() {
    this.setState({
      curValue: '0',
      lastInputNaN: true,
      hasDecimal: false
    });
  }
  
  handleDecimal() {
    if (!this.state.hasDecimal) {
      this.setState({
        curValue: this.state.curValue + '.',
        hasDecimal: true
      });
    }
  }
  
  handleNumber(num) {
    if (this.state.curValue === '0' && num === 0) {
      return;
    }
    if (this.state.lastInputNaN) {
      this.setState({
        curValue: num.toString(),
        lastInputNaN: false,
        hasDecimal: false
      });
      return;
    }
    this.setState({
      curValue: this.state.curValue + num,
    });
  }
  
  handleClick(e) {
    const value = e.target.value;
    if (!isNaN(value)) {
      this.handleNumber(Number(value));
    } else if (value === 'clear') {
      this.handleClear();
    } else if (value === '+' || value === '-' || value === 'x' || value === '/' || value ==='=') {
      this.handleCalculate(value)
    } else {
      this.handleDecimal();
    }
  }
  
  render() {
    return (
      <div>
        <div id='display'>{this.state.curValue}</div>
        <ButtonGroup onClick={this.handleClick}/>
      </div>
    );
  }
}


ReactDOM.render(<Application />, document.getElementById('app'));
