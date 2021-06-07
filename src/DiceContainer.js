import React from 'react';
import Die from "./Die";
import "./DiceContainer.css"
import RollButton from './RollButton';
import ScoreContainer from './ScoreContainer'

export default class DiceContainer extends React.Component {

	state = {
		roll: 0,
		numbers: [1,2,3,4,5],
		hold: [false, false, false, false, false],
		tableClicked: false,
		gameOver: true,
		actionText: "Commencer la partie",
		scoreContainerKey: Math.random().toString(36).substring(7) //Reset the scoreboard when resetting the state
	}

	toggleDieHold = (id) => {
		if (this.state.roll > 0 && this.state.roll < 3 && !this.state.tableClicked) {
			let holds = this.state.hold
			holds[id] = !holds[id]
			this.setState({hold: holds});
		}
	}

	handleRollClick = () => {
		if (this.state.gameOver) {
			this.newGame();
		} else if (this.state.roll === 3 && this.state.tableClicked) {
			this.newTurn();
		} else if (this.state.roll !== 3) {
			if (!this.state.tableClicked) {
				this.newRoll();
			} else {
				this.newTurn();
			}
		}
	}

	newGame = () => {
		this.setState({
			roll: 0,
			numbers: [1,1,1,1,1],
			hold: [false, false, false, false, false],
			rollClicked: true,
			tableClicked: false,
			gameOver: false,
			scoreContainerKey: Math.random().toString(36).substring(7)},
			() => {this.newTurn()}
		)
	}

	newTurn = () => {
		this.setState({
			roll: 0,
			hold: [false, false, false, false, false],
			rollClicked: true,
			tableClicked: false,
			gameOver: false},
			() => {this.newRoll()}
		)
	}

	newRoll = () => {
		this.rollDice()
		this.setState({roll: this.state.roll+1, actionText: "Lancer " + (this.state.roll+1)},
			() => {if (this.state.roll === 3) {
				this.setState({actionText: "Choisissez une ligne", tableClicked:false, hold: [false, false, false, false, false]});
			}
		});

	}

	rollDice = () => {
		let newNumbers = [...this.state.numbers];
		for (var i=0; i<5; i++) {
			if (!this.state.hold[i]) {
				newNumbers[i] = Math.floor(Math.random()*6)+1;
			}
		}
		this.setState({numbers: newNumbers});
	}

	handleScoreClick = () => {
		this.setState({
			tableClicked:true,
			hold: [false, false, false, false, false],
			actionText: "Relancez les dés"
		});
	}

	handleGameOver = (finalScore) => {
		this.setState({
			gameOver: true,
			actionText: "Partie terminée ! Score total : " + finalScore
		});
	}

	render() {
		return (
		<>
		<div className="dice-container">
			<div className="dice-bar">
				<Die id={0} number={this.state.numbers[0]} hold={this.state.hold[0]} toggleDieHold={this.toggleDieHold} />
				<Die id={1} number={this.state.numbers[1]} hold={this.state.hold[1]} toggleDieHold={this.toggleDieHold} />
				<Die id={2} number={this.state.numbers[2]} hold={this.state.hold[2]} toggleDieHold={this.toggleDieHold} />
				<Die id={3} number={this.state.numbers[3]} hold={this.state.hold[3]} toggleDieHold={this.toggleDieHold} />
				<Die id={4} number={this.state.numbers[4]} hold={this.state.hold[4]} toggleDieHold={this.toggleDieHold} />
			</div>
		</div>
		<p>{this.state.actionText}</p>

		<RollButton gameState={this.state} handleRollClick={this.handleRollClick} />		

      	<ScoreContainer gameState={this.state} handleScoreClick={this.handleScoreClick} handleGameOver={this.handleGameOver} key={this.state.scoreContainerKey} />

		</>)
	}
}