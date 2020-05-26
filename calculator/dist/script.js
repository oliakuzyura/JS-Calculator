class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '',
      curValue: '0',
      prevValue: '',
      lastClicked: '',
      curSign: '' };

    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleEqual = this.handleEqual.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);

  }

  handleNumber(e) {
    const number = /\d/;



    if (this.state.lastClicked.match(number) || this.state.lastClicked == '.') {
      if (this.state.curValue == '0' && e.target.value == '0') {

        this.setState({
          curValue: this.state.curValue,
          display: this.state.display,
          lastClicked: e.target.value });


      } else
      {
        this.setState({
          curValue: this.state.curValue + e.target.value,
          display: this.state.display + e.target.value,
          lastClicked: e.target.value });

      }

    } else
    {
      if (e.target.value == '0') {
        this.setState({
          curValue: e.target.value,
          display: this.state.display,
          lastClicked: '' });

      } else
      {
        this.setState({
          curValue: e.target.value,
          display: this.state.display + e.target.value,
          lastClicked: e.target.value });

      }
    }






  }

  handleDecimal(e) {
    const number = /\d/;
    if (!this.state.curValue.includes('.')) {
      if (this.state.lastClicked.match(number)) {
        this.setState({
          curValue: this.state.curValue + e.target.value,
          display: this.state.display + e.target.value,
          lastClicked: '.' });


      } else
      {
        this.setState({
          curValue: '0' + '.',
          display: this.state.display + '0' + '.',
          lastClicked: '.' });


      }
    }
  }

  handleOperator(e) {
    const value = e.target.value.replace('X', '*');

    this.setState(
    {
      display: this.state.display + value,
      curSign: e.target.value,
      prevValue: this.state.curValue,
      lastClicked: e.target.value,
      curValue: e.target.value });



  }

  handleClear() {
    this.setState({
      curValue: '0',
      display: '',
      lastClicked: '' });

  }

  handleEqual() {
    let expression = this.state.display;



    expression = expression.replace(/([+*\/-])[+*\/-]+([+*\/-])/, '$2');
    expression = expression.replace(/([+*\/-])([+*\/])/, '$2');

    let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
    this.setState(
    {
      curValue: answer,
      lastClicked: '',
      display: answer,
      decimalClicked: false });

  }

  render() {
    return (
      React.createElement("div", { id: "calculator" },
      React.createElement(Display, { display: this.state.display, curValue: this.state.curValue }),
      React.createElement(Buttons, { handleDecimal: this.handleDecimal, handleOperator: this.handleOperator, handleEqual: this.handleEqual, handleClear: this.handleClear, handleNumber: this.handleNumber })));


  }}


class Buttons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      React.createElement("div", null,

      React.createElement("div", { id: "buttonsGrid" },
      React.createElement("button", { id: "clear",
        onClick: this.props.handleClear }, "AC"),

      React.createElement("button", {
        id: "divide",
        onClick: this.props.handleOperator,
        value: "/" }, "/"),

      React.createElement("button", {
        id: "multiply",
        onClick: this.props.handleOperator,
        value: "X" }, "X"),

      React.createElement("button", {
        id: "seven",
        onClick: this.props.handleNumber,
        value: "7" }, "7"),

      React.createElement("button", {
        id: "eight",
        onClick: this.props.handleNumber,
        value: "8" }, "8"),

      React.createElement("button", {
        id: "nine",
        onClick: this.props.handleNumber,
        value: "9" }, "9"),

      React.createElement("button", {
        id: "subtract",
        onClick: this.props.handleOperator,
        value: "-" }, "-"),

      React.createElement("button", {
        id: "four",
        onClick: this.props.handleNumber,
        value: "4" }, "4"),

      React.createElement("button", {
        id: "five",
        onClick: this.props.handleNumber,
        value: "5" }, "5"),

      React.createElement("button", {
        id: "six",
        onClick: this.props.handleNumber,
        value: "6" }, "6"),

      React.createElement("button", {
        id: "add",
        onClick: this.props.handleOperator,
        value: "+" }, "+"),

      React.createElement("button", {
        id: "one",
        onClick: this.props.handleNumber,
        value: "1" }, "1"),

      React.createElement("button", {
        id: "two",
        onClick: this.props.handleNumber,
        value: "2" }, "2"),

      React.createElement("button", {
        id: "three",
        onClick: this.props.handleNumber,
        value: "3" }, "3"),

      React.createElement("button", {
        id: "equals",
        onClick: this.props.handleEqual,
        value: "=" }, "="),

      React.createElement("button", {
        id: "zero",
        onClick: this.props.handleNumber,
        value: "0" }, "0"),

      React.createElement("button", {
        id: "decimal",
        onClick: this.props.handleDecimal,
        value: "." }, "."))));




  }}


class Display extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      React.createElement("div", { id: "screen" },
      React.createElement("div", { id: "curExpression" },
      this.props.display),

      React.createElement("div", { id: "display" },
      this.props.curValue)));



  }}

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));