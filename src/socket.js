import openSocket from 'socket.io-client';

const  socket = openSocket('http://localhost:3001');

const Socket = {
	joinRoom:joinRoom,
	userAdded: userAdded,
	setStory: setStory,
	onStorySet: onStorySet,
	selectCard: selectCard,
	onCardSelected: onCardSelected,
	onUserLeft: onUserLeft,
	onAdminLeft: onAdminLeft
}

function joinRoom(user){
	socket.emit('ADD_USER', user);
}

function userAdded(cb){
	socket.on('USER_JOINED', data => cb(data));
}

function setStory(story, room, admin){
	socket.emit('SET_STORY', {story, room, admin});	
}

function onStorySet(cb){
	socket.on('STORY_SET', story => cb(story))
}

function selectCard(card, room, user){
	socket.emit('SELECT_CARD', {card, room, user});	
}

function onCardSelected(cb){
	socket.on('CARD_SELECED', data => cb(data));	
}

function onUserLeft(cb){
	socket.on('USER_LEFT', data => cb(data));	
}

function onAdminLeft(cb){
	socket.on('ADMIN_LEFT', data => cb(data));	
}
export default Socket;