import React from 'react';

export default class RollButton extends React.Component {

	render() {
		return (
			<button id="rollButton" className={`roll-button${this.props.roll === 3 ? '-reroll' : ''}`}
			onClick={this.props.handleRollClick}>
				{this.props.gameState.gameOver ? 'Nouvelle partie' : (this.props.gameState.roll === 3 || this.props.gameState.tableClicked ? 'Relancer' : 'Lancer')}
			</button>
		)
	}

}