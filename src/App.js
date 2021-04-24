import React, { Component } from 'react';
import './App.css';
import {CardList} from './components/card-list/card-list.component';
import {SearchBox} from './components/search-box/search-box.component';

class App extends Component {

  constructor() {
    //super gives us the life cycle methods extended from the component class in react
    super();
    this.state = {
      monsters: [],
      searchField: '',
    };
    //non arrow function methods referring 'this' must be binded in the class constructor
    //without binding, handleChange method below would would find that 'this' is undefined in runtime.
    //arrow functions autobind to the class that calls the method however, so this is unecessary
    // this.handleChange = this.handleChange.bind(this);
  }
  //life cycle method
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(users => this.setState({monsters: users}) );
  }
  //arrow functions autobind to the class they are defined when 'this' is used
  //dont believe any nerds who say binding is better performing, babel/webpack ensure we have fast code. 
  handleChange = (e) => {
    this.setState({ searchField: e.target.value })
  }

  render() {
    //destructuring, setting const of monsters and searchfield.
    const {monsters, searchField} = this.state;
    //any array of objects whos name matches any pattern/includes() whatever is in the searchfield string
    //this array changes onChange in the input method
    const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchField.toLowerCase())
    )
    return (
      <div className="App">
        <h1>Monsters Roladex</h1>
        <SearchBox 
          placeholder="Search Monsters"
          handleChange={this.handleChange}
        />

        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
