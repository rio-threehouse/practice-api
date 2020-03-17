import React from 'react';
import './App.css';

export default class App extends React.Component  {
  constructor() {
    super();
    this.state = {
      memo: '',
      lists: [],
    }
    this._onSubmit = this._onSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onDelete = this._onDelete.bind(this);
  }

  componentWillMount(){
    this.fetchResponse();
  }

fetchResponse(){
  fetch('http://localhost:3001/memos')
  .then( res => res.json( ))
  .then( res => {
    this.setState({
      lists : res
    });
  })
}

  _onSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:3001/memos', {
      method: 'POST',
      body: JSON.stringify({
        memo: this.state.memo
      }),
      headers: new Headers({ 'Content-type' : 'application/json'})
    }).then(() => {
      this.fetchResponse();
      this.setState({
        memo: ''
      })
    })
  }

  _onChange(event) {
    this.setState({
      memo: event.target.value,
    });
  }

  _onDelete(event) {
    fetch(`http://localhost:3001/memos/${event.target.name}`, {
    method: 'DELETE'
   }).then( () => {
    this.fetchResponse();
   })
  }

  render() {
    return (
      <form onSubmit={this._onSubmit}>
        <div>
          <label>memo</label>
          <br />
          <textarea value={this.state.memo} onChange={this._onChange} />
        </div>
        <button type="submit" >保存</button>
        <ul>
          {this.state.lists.map((item) => { 
            return (
              <li key={item.id}>
                <input value={item.memo} onChange={() => {console.log('change')} }/>
                <input name={item.id} type="button" onClick={this._onDelete} value="削除"/>
              </li>
            )
          })}
        </ul>
      </form>
    );
  }
}





