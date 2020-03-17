import React from 'react';
import './App.css';

export default class App extends React.Component  {
  constructor() {
    super();
    this.state = {
      memo: '',
      editMemo: '',
      editId: '',
      isEdit: false,
      lists: [],
    }
    this._onSubmit = this._onSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onDelete = this._onDelete.bind(this);
    this._isEdit = this._isEdit.bind(this);
    this._onChangeEdit = this._onChangeEdit.bind(this);
    this._onEdit = this._onEdit.bind(this);
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

  _onChangeEdit(event) {
    this.setState({
      editMemo: event.target.value,
    });
  }

  _onDelete(event) {
    fetch(`http://localhost:3001/memos/${event.target.name}`, {
    method: 'DELETE'
   }).then( () => {
    this.fetchResponse();
   })
  }

  _isEdit(event) {
    console.log('event:', event);
    this.setState({
      editMemo: event.target.name,
      editId: event.target.value,
      isEdit: true,
    })
  }

  _onEdit(event) {
    console.log(this.state.editId)
    console.log(this.state.editMemo)
    event.preventDefault();
    fetch(`http://localhost:3001/memos/${this.state.editId}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: this.state.editId,
        memo: this.state.editMemo
      }),
      headers: new Headers({ 'Content-type' : 'application/json'})
    }).then(() => {
      this.fetchResponse();
      this.setState({
        isEdit: false,
        editMemo: '',
        editId: '',
      })
    })
  }

  render() {
    return (
      <>
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
                <div>{item.memo}</div>
                <input name={item.id} type="button" onClick={this._onDelete} value="削除"/>
                <br />
                <input name={item.memo} type="button" onClick={this._isEdit} value={item.id} />
                <label>　←編集ボタン</label>
              </li>
            )
          })}
        </ul>
        </form>
        {this.state.isEdit &&
          <form onSubmit={this._onEdit}>
            <textarea name={this.state.editId} value={this.state.editMemo} onChange={this._onChangeEdit} />
            <br />
            <button type="submit" >変更</button>
          </form>
        }   
      </>
    );
  }
}





