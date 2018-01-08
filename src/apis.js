const URL = 'http://localhost:3001/api';

export const apis = {
    createRoom: createRoom,
	joinRoom: joinRoom
}

function createRoom(room){
	const requestOptions = {
        method: 'POST',
        headers: {
			'Content-Type': 'application/json'
		},
        body: JSON.stringify(room)
    };
    console.log(requestOptions);
    return fetch(URL+'/rooms', requestOptions).then(handleResponse);
}

function joinRoom(roomId){
    const requestOptions = {
        method: 'GET'
    };
    console.log(requestOptions);
    return fetch(URL+'/rooms/'+roomId+'/join', requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(JSON.parse(response.statusText));
    }
    return response.json();
}