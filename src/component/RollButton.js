import React from 'react';

export default class RollButton extends React.Component {

	render() {
		return (
			<button id="rollButton" className={`roll-button${this.props.roll === this.props.maxRolls ? '-reroll' : ''}`}
			onClick={this.props.handleRollClick}>
				{this.props.gameState.gameOver ? 'Nouvelle partie' : (this.props.gameState.roll === this.props.maxRolls || this.props.gameState.tableClicked ? 'Relancer' : 'Lancer')}
			</button>
		)
	}

}