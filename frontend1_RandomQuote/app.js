// https://learn.freecodecamp.org/front-end-libraries/front-end-libraries-projects/build-a-random-quote-machine

const QUOTES = [ 
  'Don\'t cry because it\'s over, smile because it happened.', 
  'Be yourself; everyone else is already taken.', 'A room without books is like a body without a soul.', 'You only live once, but if you do it right, once is enough.', 'You know you\'re in love when you can\'t fall asleep because reality is finally better than your dreams.', 'In three words I can sum up everything I\'ve learned about life: it goes on.'
];
const AUTHORS = ['Dr. Seuss', 'Oscar Wilde', ' Marcus Tullius Cicero', 'Mae West', ' Dr. Seuss ', ' Robert Frost '];

const QuoteContent = (props) => (
  <div>
    <div id="text">{props.quote}</div>
    <div id="author">{'-' + props.author}</div>
  </div>
);

const QuoteBar = (props) => (
  <div id="quote-bar">
    <div>
      <button id=''>Tweet</button>
      <a id='tweet-quote' href='twitter.com/intent/tweet'></a>
    </div>
    <div>
      <button id='new-quote' onClick={props.changeQuote}>New Quote</button>
    </div>
  </div>
);

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: QUOTES[0],
      author: AUTHORS[0]
    }
    this.changeQuote = this.changeQuote.bind(this);
  }
  
  changeQuote(e) {
    e.preventDefault();
    // Random generate the index of quote
    const newId = Math.floor(Math.random() * 5);
    const newQuote = QUOTES[newId];
    const newAuthor = AUTHORS[newId];
    this.setState({
      quote: newQuote,
      author: newAuthor
    });
  }
  
  render() {
    return (
      <div id="quote-box">
        <QuoteContent quote={this.state.quote} author={this.state.author} />
        <QuoteBar changeQuote={this.changeQuote} />
      </div>);
  }
}
ReactDOM.render(<Application />, document.getElementById('app'));
