// https://learn.freecodecamp.org/front-end-libraries/front-end-libraries-projects/build-a-drum-machine

const DrumPad = (props) => (
  <div id={props.text + '-pad'} className='drum-pad' onClick={props.handleClick} data-btnId={props.text}>
    {props.text}
    <audio className='clip' id={props.text} src={props.audio} /> 
  </div>
);

const PadContainer = (props) => {
  const texts = [
    {index: 'Q', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'}, 
    {index: 'W', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'},
    {index: 'E', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'}, 
    {index: 'A', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'},
    {index: 'S', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'},
    {index: 'D', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'}, 
    {index: 'Z', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'},
    {index: 'X', audio: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'},
    {index: 'C', audio: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'}];
  const pads = texts.map(text => 
    <DrumPad key={text.index} text={text.index} audio={text.audio} handleClick={props.handleClick}/>                  
  );
  return (
  <div id='padContainer'>
    {pads}
  </div>
  );
};

class Application extends React.Component {
  constructor() {
    super();
    
    this.state = {
      keypressed: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  
  handleClick(e) {
    e.preventDefault();
    const sound = document.getElementById(e.target.dataset.btnid);
    console.log(e.target.dataset.btnid);
    sound.play();
    this.setState( { keyPressed: e.target.dataset.btnid } )
  }
  
  handleKeyPress(e) {
    const sound = document.getElementById(e.key.toUpperCase());
    sound.play();
    this.setState( { keyPressed: e.key.toUpperCase() } )
  }
  
  componentDidMount = (e) => {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  
  render() {
    return (
      <div id='drum-machine' tabIndex='0'>
        <PadContainer handleClick={this.handleClick} />
        <div id='display'>{ this.state.keyPressed }</div>
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('app'));
