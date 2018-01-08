import React, { Component } from 'react';

import NewRoom from "./NewRoom";
import JoinRoom from "./JoinRoom";
import Home from "./Home";
import ToastrContainer from 'react-toastr-basic'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            screen:'login'
        };

        this.roomCreated = this.roomCreated.bind(this);
        this.roomJoined = this.roomJoined.bind(this);
        this.resetScreen = this.resetScreen.bind(this);
    }
    componentDidMount(){
        
    }

    roomCreated(room, user){
        sessionStorage.setItem('room', JSON.stringify(room));
        sessionStorage.setItem('user', JSON.stringify(user));
        this.setState({room, screen:'home'});
    }

    roomJoined(room, user){
        sessionStorage.setItem('room', JSON.stringify(room));
        sessionStorage.setItem('user', JSON.stringify(user));
        this.setState({room, screen:'home'});
    }

    resetScreen(){
        this.setState({screen:'login'});
    }

    render() {
        const {screen, room} = this.state;
        const actions = {
            roomCreated: this.roomCreated
        }
        const actions2 = {
            roomJoined: this.roomJoined
        }
        return (
            <div className="">
                {screen === 'login' && 
                    <div className="container">
                        <div className="logo">Planning Poker</div>
                        <div className="col-sm-6 ">
                            <NewRoom actions={actions} />
                        </div>
                        <div className="col-sm-6 ">
                            <JoinRoom actions={actions2}/>
                        </div>
                        <div className="center col-xs-12 mTop10">
                            
                        </div>
                    </div>
                }
                {
                    screen === 'home' && 
                    <div className="container">
                        <Home room={room} resetScreen={this.resetScreen}/>
                    </div>
                }
                <ToastrContainer/>
            </div>
        );
    }
}

export default App;
