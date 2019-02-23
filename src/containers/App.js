import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';


class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {setTimeout(() => {this.setState({ robots: users })}, 2000)});
}

onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })

}

    render() {
        const { robots, searchfield } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })
        return !robots.length ?
                <div class="vh-100 dt w-100">
                <div class="dtc v-mid">
                    <h1 class="f1 tc">loading...</h1>
                </div>
                </div> :
                (
                    <div className='tc'>
                        <h1 className='f1'>RoboFriends</h1>
                        <SearchBox searchChange={this.onSearchChange} />
                        <Scroll>
                        <CardList robots={filteredRobots} />
                        </Scroll>
                    </div>
                );
    }
}

export default App;