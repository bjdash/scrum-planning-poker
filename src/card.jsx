import React, {Component} from "react";

class Card extends Component{
	zero(){
		return(
			<section className="card card--heart" value=" ">
	            <div className="card__inner card__inner--centered">
	                <div className="card__column card__column--centered"></div>
	            </div>
	        </section>
		);
	}

	one(){
		const {selected} = this.props;
		return(
			<section className={'card card--heart'+(selected===1?' cardSelected':'')} value="1">
	            <div className="card__inner card__inner--centered">
	                <div className="card__column card__column--centered">
	                    <div className="card__symbol"></div>
	                </div>
	            </div>
	        </section>
		);
	}

	two(){
		const {selected} = this.props;
		return(
			<section className={'card card--heart'+(selected===2?' cardSelected':'')} value="2">
	            <div className="card__inner card__inner--centered">
	                <div className="card__column">
	                    <div className="card__symbol"></div>
	                    <div className="card__symbol"></div>
	                </div>
	            </div>
	        </section>
		);
	}

	three(){
		const {selected} = this.props;
		return(
			<section className={'card card--heart'+(selected===3?' cardSelected':'')} value="3">
				<div className="card__inner card__inner--centered">
					<div className="card__column">
						<div className="card__symbol"></div>
						<div className="card__symbol"></div>
						<div className="card__symbol"></div>
					</div>
				</div>
			</section>
		);
	}

	five(){
		const {selected} = this.props;
		return(
			<section className={'card card--heart'+(selected===5?' cardSelected':'')} value="5">
				<div className="card__inner">
					<div className="card__column">
						<div className="card__symbol"></div>
						<div className="card__symbol"></div>
					</div>
					<div className="card__column card__column--centered">
						<div className="card__symbol"></div>
					</div>
					<div className="card__column">
						<div className="card__symbol"></div>
						<div className="card__symbol"></div>
					</div>
				</div>
			</section>
		)
	}

	eight(){
		const {selected} = this.props;
		return(
			<section className={'card card--heart'+(selected===8?' cardSelected':'')} value="8">
				<div className="card__inner">
					<div className="card__column">
						<div className="card__symbol"></div>
						<div className="card__symbol"></div>
						<div className="card__symbol"></div>
					</div>
					<div className="card__column card__column--centered">
						<div className="card__symbol card__symbol--big"></div>
						<div className="card__symbol card__symbol--big"></div>
					</div>
					<div className="card__column">
						<div className="card__symbol"></div>
						<div className="card__symbol"></div>
						<div className="card__symbol"></div>
					</div>
				</div>
			</section>
		)
	}

	thirteen(){
		const {selected} = this.props;
		return(
			<section className={'card card--heart'+(selected===13?' cardSelected':'')} value="13">
				<div className="card__inner">
					<div className="card__column">
						
					</div>
					<div className="card__column card__column--centered">
						<div className="card__symbol--big roman">XIII</div>
					</div>
					<div className="card__column">
						
					</div>
				</div>
			</section>
		)
	}

	twenty(){
		const {selected} = this.props;
		return(
			<section className={'card card--heart'+(selected===20?' cardSelected':'')} value="20">
				<div className="card__inner">
					<div className="card__column">
						
					</div>
					<div className="card__column card__column--centered">
						<div className="card__symbol--big roman">XX</div>
					</div>
					<div className="card__column">
						
					</div>
				</div>
			</section>
		)
	}

	fourty(){
		const {selected} = this.props;
		return(
			<section className={'card card--heart'+(selected===40?' cardSelected':'')} value="40">
				<div className="card__inner">
					<div className="card__column">
						
					</div>
					<div className="card__column card__column--centered">
						<div className="card__symbol--big roman">XL</div>
					</div>
					<div className="card__column">
						
					</div>
				</div>
			</section>
		)
	}

	hundred(){
		const {selected} = this.props;
		return(
			<section className={'card card--heart'+(selected===100?' cardSelected':'')} value="100">
				<div className="card__inner">
					<div className="card__column">
						
					</div>
					<div className="card__column card__column--centered">
						<div className="card__symbol--big roman">C</div>
					</div>
					<div className="card__column">
						
					</div>
				</div>
			</section>
		)
	}

	grey(){
		return(
			<section className="card geryCard" value="">
				<div className="card__inner">
					
				</div>
			</section>
		)	
	}

	green(){
		return(
			<section className="card greenCard" value="">
				<div className="card__inner">
					
				</div>
			</section>
		)	
	}

	render(){
		const {value} = this.props;
		return(
			<div onClick={this.props.onClick} className="card-cont">
				{!value && this.grey()}
				{value==='green' && this.green()}
				{value===1 && this.one()}
				{value===2 && this.two()}
				{value===3 && this.three()}
				{value===5 && this.five()}
				{value===8 && this.eight()}
				{value===13 && this.thirteen()}
				{value===20 && this.twenty()}
				{value===40 && this.fourty()}
				{value===100 && this.hundred()}
			</div>
		)
		
	}
}

export default Card;