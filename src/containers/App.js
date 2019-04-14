import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';

import { setSearchField } from '../action.js';

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}


class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: []
        }
    }

componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {setTimeout(() => {this.setState({ robots: users })}, 2000)});
}

    render() {
        const { robots } = this.state;
        const { searchField, onSearchChange } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })
        return !robots.length ?
                <div className="vh-100 dt w-100">
                <div className="dtc v-mid">
                    <h1 className="f1 tc">loading...</h1>
                </div>
                </div> :
                (
                    <div className='tc'>
                        <h1 className='f1'>RoboFriends</h1>
                        <SearchBox searchChange={onSearchChange} />
                        <Scroll>
                        <CardList robots={filteredRobots} />
                        </Scroll>
                    </div>
                );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);