import React, { Component } from 'react';
import {apis} from "./apis";
//import Socket from "./socket";
import {Utils} from "./utils";

class NewRoom extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            admin:''
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

    createRoom(e){
        e.preventDefault()
        console.log(this.state);
        const {name,admin}  = this.state;
        apis.createRoom({name,admin:Utils.s8()}).then(
            room => {
                let user = {name:admin, id:room.admin, roomId:room.id}
                this.props.actions.roomCreated(room, user);
            }, 
            err => {
                console.log(err);
            }
        )
    }

    render() {
        const {name,admin} = this.state;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Create Room</h3>
                </div>
                <div className="panel-body">
                    <div className="">
                        <form onSubmit={(e)=>{this.createRoom(e)}} >
                            <div className="form-group">
                                <label>Room Name:</label>
                                <input type="text" required name="name" className="form-control" value={name} onChange={(e)=>this.handleFormChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label>Your Name:</label>
                                <input type="text" required name="admin" className="form-control" value={admin} onChange={(e)=>this.handleFormChange(e)}/>
                            </div>
                            
                            <div className="center col-xs-12 mTop10">
                                <button type="submit" className="btn btn-primary">Create Room</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default NewRoom;
