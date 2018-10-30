// https://learn.freecodecamp.org/front-end-libraries/front-end-libraries-projects/build-a-markdown-previewer

// set marked.js 
var renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
    var link = marked.Renderer.prototype.link.call(this, href, title, text);
    return link.replace("<a","<a target='_blank' ");
};
marked.setOptions({
  breaks: true,
  renderer: renderer
});

const Editor = (props) => (
  <textarea id='editor' onChange={props.textChange}>{props.markdown}</textarea>
);

const Preview = (props) => (
  <div id='preview' dangerouslySetInnerHTML={{__html: marked(props.markdown)}}ˆ/>
);

const firstLoadMD = '# This is a Markdown Previewer\n## project for FCC \nDepends on [markedjs](https://github.com/markedjs/marked) \n\n`marked(text)` \n\n```\nconsole.log("happy coding")\n```\n\n - React \n\n - HTML \n\n> hello coding world\n\n![React](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)\n\ncreate by ***Jingyi***'
class Application extends React.Component {
  constructor() {
    super();
    this.state = {
      markdown: firstLoadMD,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    e.preventDefault();
    this.setState({
      markdown: e.target.value
    });
  }
  render() {
    return (
      <div id='wrapper'>
        <Editor markdown={this.state.markdown} textChange={this.handleChange}/>
        <Preview markdown={this.state.markdown} />
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('app'));
