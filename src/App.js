import React from 'react';
import './App.css';

export default class App extends React.Component  {
  constructor() {
    super();
    this.state = {
      memo: '',
      lists: [],
    }
    this._onChange = this._onChange.bind(this)
  }

  componentWillMount(){
  this.fetchResponse();
}

fetchResponse(){
  console.log('done');
  fetch('http://localhost:3001/memos')
  .then( res => res.json( ))
  .then( res => {
    this.setState({
      lists : res
    });
  })
}

  _onChange(event) {
    this.setState({
      memo: event.target.value,
    });
  }

  render() {
    return (
      <form>
        <div>
          <label>memo</label>
          <br />
          <textarea value={this.state.memo} onChange={this._onChange} />
        </div>
        <button type="submit" >保存</button>
        <ul>
          {this.state.lists.map((item) => { 
            return (<li key={item.id}>{item.memo}</li>)
          })}
        </ul>
        {console.log('list:',this.state.lists)}
      </form>
    );
  }
}





