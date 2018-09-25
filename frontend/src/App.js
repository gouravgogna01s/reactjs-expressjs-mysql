import React, { Component } from 'react';
import './App.css';

class App extends Component {

	constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onDeleteName = this.onDeleteName.bind(this);
    this.onEditName = this.onEditName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      users: [],
      name: '',
      id:''
    }
  }

	componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }))
	}

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

 	onSubmit(e) {
    //e.preventDefault();
    console.log(this.state.name);
    fetch('/users/insertData', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user: this.state.name}),
    }).then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
    }).then(function(data) {
        console.log(data)    
        if(data === "success"){
            this.setState({msg: "Thanks for Insertion"});  
        }
    }).catch(function(err) {
        console.log(err)
    });
  }

  onDeleteName(e) {
    console.log(e.target.id);
    fetch('/users/deleteData/', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({delId: e.target.id}),
      }).then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      }).then(function(data) {
        console.log(data)    
        if(data === "success"){
            this.setState({msg: "Thanks for Deletion"});  
        }
      }).catch(function(err) {
          console.log(err)
      });
      window.location.reload();
  } 

  onEditName(e) {
    console.log(e.target.id);
    //event.preventDefault()
    fetch("/users/edit", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({delId: e.target.id, uname: 'New Row Edited'})
    }).then(function(response) {
      if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      }).then(function(data) {
      console.log(data)
      if (data === "success") {
        console.log("User has been edited.")
        /*
        this.setState({
          msg: "User has been edited."
        });
        */
      }
    }).catch(function(err) {
        console.log(err)
      });
    window.location.reload();
  }

  render() {
    return (
      <div className="App col-md-4 border border-info p-4 rounded">
        <h2>USERS DETAIL</h2>
        <ol className="p-4">
          {this.state.users.map(user => <li key={user.id} className="m-3 text-left">{user.username}
            <button onClick={this.onDeleteName.bind(this)} id={user.id} className="btn btn-danger btn-sm m-1 float-right">
              DELETE
            </button>
            <button onClick={this.onEditName.bind(this)} id={user.id} className="btn btn-info btn-sm m-1 float-right">
              EDIT
            </button>
          </li>)}
        </ol>
          <form onSubmit={this.onSubmit} className="p-4">
            <div className="form-group">
              <label>UserName </label>
              <input type="text" value={this.state.name} className="form-control" onChange={this.onChangeName} required/>
            </div>
            <div className="form-group">
              <input type="submit" value="Add User" className="btn btn-primary"/>
            </div>
          </form>
      </div>
    );
  }
}

export default App;
