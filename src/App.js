import React, { Component  } from "react";
import logo from "./logo.svg";
import "./App.css";
import { reduxForm } from 'redux-form';

class App extends Component {
  constructor(props) {
    super(props);
    this.enableNotification = this.enableNotification.bind(this);     
    this.handleSubmit = this.handleSubmit.bind(this);       
  } 


  enableNotification(){
    Notification.requestPermission(function(result) {
      console.log("User choice", result);
      if (result !== "granted") {
        console.log("No notification permission granted!");
      } 
    });      
  }

  handleSubmit(event) {
    event.preventDefault();
    var object = { info: 'event source testing'};
    var json = JSON.stringify(object);    
    const url = "http://localhost:3001/fact";
    var http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.send(json);  
    console.log('handleSubmit');
  }  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div style={{ padding: 15 }}>
          <h2>Customer Form</h2>
          <h3>Enable notifications: <button onClick={() => this.enableNotification()}>Enable</button></h3>          
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <div>
                <button type="submit" >
                    Submit
                </button>
            </div>
          </form>
        </div>
      </div>
      
    );
  }
}
export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(App);
