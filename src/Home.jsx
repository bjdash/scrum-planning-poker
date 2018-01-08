import React, { Component } from 'react';
import Socket from "./socket";
import Card from "./card";
import UserCard from "./userCard";
import {Toast, ToastDanger} from 'react-toastr-basic'; //

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            story:'',
            selectedCard:'',
            revealed:false,
            users:[]
        };

        const room = JSON.parse(sessionStorage.getItem('room'));
        const user = JSON.parse(sessionStorage.getItem('user'));
        this.state.room = room;
        this.state.user = user;
        this.state.isAdmin = room.admin === user.id?true:false;

        //socket listeners
        Socket.userAdded((data) => {
            this.userJoined(data)
        });
        Socket.onStorySet((story)=>{
            this.onStorySet(story)
        });
        Socket.onCardSelected((data)=>{
            this.onCardSelected(data)
        });
        Socket.onUserLeft((data)=>{
            this.onUserLeft(data)
        });
        Socket.onAdminLeft((data)=>{
            this.onAdminLeft(data)
        });
        Socket.onCardsRevealed((data)=>{
            this.onCardsRevealed(data)
        });
    }
    componentWillReceiveProps(props){
        //this.setState({room:props.room})
    }

    componentDidMount(){
        Socket.joinRoom({
                    name:this.state.user.name,
                    id:this.state.user.id,
                    roomId:this.state.room.id
                });    
    }

    userJoined(users){
        this.setState({users});
    }

    handleFormChange(event){
        let {name, value} = event.target;
        this.setState({
            [name]:value
        });
    }

    _handleKeyPress(e){
        if (e.key === 'Enter') {
            this.setStory();
        }
    }

    revealCards(){
        this.setState({revealed:true});
        Socket.revealCards(this.state.room.id);
    }

    setStory(){
        Socket.setStory(this.state.story, this.state.room.id, this.state.user.id);
    }

    onStorySet(story){
        this.setState({story});
        let users = this.state.users.map((userX,index)=>{
            let user = {...userX};
            delete user.card;
            return user;
        });
        this.setState({revealed:false, users, selectedCard:''});
        Toast('New Story selected...');
    }

    selectCard(card){
        this.setState({selectedCard:card});
        Socket.selectCard(card, this.state.room.id, this.state.user.id);
    }

    onCardSelected(data){
        const {card, user} = data;
        let users = this.state.users.map((userX,index)=>{
            return userX.id === user? {...userX, card} : userX;
        })
        this.setState({users});
        console.log('card selected', data);
    }

    onUserLeft(data){
        console.log('user disconnected', data);
        var remainingUsers = this.state.users.filter(user => user.id !== data.id);
        // var remainingUsers = this.state.users.filter((user)=>{
        //    if(user.id !== data.id) return user;
        // });
        console.log('remaining', remainingUsers);
        this.setState({users:remainingUsers});
    }

    onAdminLeft(){
        ToastDanger('Admin has left the room.');
        this.props.resetScreen();
    }
    onCardsRevealed(){
        this.setState({revealed:true});
    }

    render() {
        const {room, users, isAdmin, story, selectedCard, revealed} = this.state;
        //const myId = this.state.user.id;
        return (
            <div className="container-fluid">
                <div className="roomTitle">Team: <span className="bold">{room.name}</span><span className="roomId mLeft10">({room.id})</span></div>
                <div className="container">
                    <div className="storySection">
                        {
                            isAdmin &&
                            <div className="input-group">
                                <span className="input-group-addon story">Story: </span>
                                <input type="text" name="story" value={story} onKeyPress={(e)=>{this._handleKeyPress(e)}} onChange={(e)=>{this.handleFormChange(e)}} className="form-control input-story" placeholder="Story..." />
                                <span className="input-group-btn">
                                    <button className="btn btn-primary" type="button" onClick={(e)=>{this.setStory()}}>Go!</button>
                                </span>
                            </div>
                        }
                        {
                            !isAdmin && 
                            <div className="story">Story: 
                                <span className="bold mLeft10">{story}</span>
                            </div>
                        }
                    </div>


                    {
                        true ? (
                            (users && users.length>1) ? 
                                <div className="usersList">
                                    <label className="teamLabel">
                                        Team members
                                        {isAdmin && <button type="button" className="btn btn-sm btn-success mLeft10" onClick={()=>{this.revealCards()}}> Reveal all</button>}
                                    </label>
                                    <div className="col-xs-9">
                                        {users/*.filter(user => user.id !== myId)*/.map((user)=>{
                                            return (<UserCard value={user.card} revealed={revealed} key={user.id} name={user.name} />)
                                        })}
                                    </div>
                                </div> 
                                :
                                <div className="center noUser">
                                    <div>Invite members to join your room. Room id: <span className="bold">{room.id}</span></div>
                                    <div>Visit <a href="https://scrum-poker-plan.herokuapp.com">https://scrum-poker-plan.herokuapp.com</a> and enter room id <span className="bold">{room.id}</span></div>
                                </div>
                            ): null
                    }

                    { true && 
                        <div>
                            <div className="col-sm-9 deck rotateHand">
                                <Card value={1} selected={selectedCard} onClick={()=>{this.selectCard(1)}}/>
                                <Card value={2} selected={selectedCard} onClick={()=>{this.selectCard(2)}} />
                                <Card value={3} selected={selectedCard} onClick={()=>{this.selectCard(3)}}/>
                                <Card value={5} selected={selectedCard} onClick={()=>{this.selectCard(5)}}/>
                                <Card value={8} selected={selectedCard} onClick={()=>{this.selectCard(8)}}/>
                                <Card value={13} selected={selectedCard} onClick={()=>{this.selectCard(13)}}/>
                                <Card value={20} selected={selectedCard} onClick={()=>{this.selectCard(20)}}/>
                                <Card value={40} selected={selectedCard} onClick={()=>{this.selectCard(40)}}/>
                                <Card value={100} selected={selectedCard} onClick={()=>{this.selectCard(100)}}/>
                            </div>
                            {/*<div className="col-sm-3">
                                <div className="fSize20 bold">Team members</div>
                                {users.map((user)=>{
                                    return (<div className="members" key={user.id} >
                                        <span>{user.name}</span>
                                        {user.id === room.admin && <span className="mLeft10">(admin)</span>}
                                        {user.id === myId && <span className="mLeft10">(you)</span>}

                                        {user.card && <span className="glyphicon glyphicon-ok pull-right"></span>}
                                    </div>)
                                })}
                            </div>*/}
                        </div>
                    }
                </div>
            </div>
            
        );
    }
}

export default Home;
