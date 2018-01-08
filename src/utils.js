export const Utils={
	s4:s4,
	s8:s8
}

function s4(){
	return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

function s8(){
	return s4()+s4();
}