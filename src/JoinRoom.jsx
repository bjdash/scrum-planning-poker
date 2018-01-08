import React, { Component } from 'react';
import {apis} from "./apis";
import {Utils} from "./utils";

class JoinRoom extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            roomId:''
        };
    }
    componentDidMount(){
        
    }

    handleFormChange(event){
        let {name, value} = event.target;
        this.setState({
            [name]:value
        });
    }

    joinRoom(e){
        e.preventDefault()
        console.log(this.state);
        apis.joinRoom(this.state.roomId).then(
            room => {
                const {name, roomId} = this.state;
                this.props.actions.roomJoined(room, {name, roomId, id:Utils.s8()});
            }, 
            err => {
                console.log(err);
            }
        )
    }

    render() {
        const {name, roomId} = this.state;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Join Room</h3>
                </div>
                <div className="panel-body">
                    <div className="">
                        <form onSubmit={(e)=>{this.joinRoom(e)}}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text" name="name" className="form-control" value={name} onChange={(e)=>this.handleFormChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label>Room Id:</label>
                                <input type="text" name="roomId" className="form-control" value={roomId} onChange={(e)=>this.handleFormChange(e)}/>
                            </div>
                            
                            <div className="center col-xs-12 mTop10">
                                <button type="submit" className="btn btn-primary">Join Room</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default JoinRoom;
