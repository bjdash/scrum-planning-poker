import React, {Component} from "react";
import Card from "./card";


class UserCard extends Component {
	render(){
		const {name,value, revealed} = this.props;
		return(
			<div className="userCard">
				<div>
					<Card value={value?revealed?value:'green':undefined}/>
				</div>
				<div className="user center">
					{name}
				</div>
				
			</div>
		)
	}
}

export default UserCard;