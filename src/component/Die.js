import React from 'react';

import icon1 from '../icons/1.png';
import icon2 from '../icons/2.png';
import icon3 from '../icons/3.png';
import icon4 from '../icons/4.png';
import icon5 from '../icons/5.png';
import icon6 from '../icons/6.png';

export default class Die extends React.Component {
	holdDie = () => {
		this.props.toggleDieHold(this.props.id);
	}

	render() {
		const dieIcons = [icon1, icon2, icon3, icon4, icon5, icon6];
		return <div className={`dice-container ${this.props.hold ? "hold" : "free"}`}>
			<img src={dieIcons[this.props.number-1]} onClick={this.holdDie} alt={this.props.number} />
		</div>
	}


}