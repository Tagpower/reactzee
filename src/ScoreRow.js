import React from 'react';
import "./ScoreRow.css"

export default class ScoreRow extends React.Component {


	state = {
		used: false,
		score: 0,
		scoreDisplayed: ""
	}


	click = () => {
		//if (this.props.name === "Yahtzee" && this.props.gameState. > 1) {
			if (!this.props.gameState.tableClicked && !this.state.used) {
				var score = this.computeScore()
				this.setState({used: true, score:score});
				this.props.addScore(score);
				this.props.handleScoreClick();
			}	
		//}
	}

	cursorOn = () => {
		if(this.props.gameState.roll > 0 && !this.props.gameState.tableClicked && !this.state.used) {
			this.setState({scoreDisplayed: this.computeScore()});
		}
	}

	cursorOff = () => {
		if(this.props.gameState.roll > 0 && !this.props.gameState.tableClicked && !this.state.used) {
			this.setState({scoreDisplayed: ""});
		}
	}

	computeScore() {
		var dice = [...this.props.gameState.numbers]
		switch(this.props.name) {
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
				return this.sumOfFace(this.props.name, dice);

			case "Brelan":
				return (this.checkIfBrelan(dice) ? this.sumOfAllDice(dice) : 0);
			case "Carré":
				return (this.checkIfCarre(dice) ? this.sumOfAllDice(dice) : 0);
			case "Full":
				return (this.checkIfFull(dice) ? 25 : 0);
			case "Petite suite":
				return (this.checkIfPetiteSuite(dice) ? 30 : 0);
			case "Grande suite":
				return (this.checkIfGrandeSuite(dice) ? 40 : 0);
			case "Yahtzee":
				return (this.checkIfYahtzee(dice) ? 50 : 0);
			case "Chance":
				return this.sumOfAllDice(dice);
			default:
				return 0;
		}

	}

	checkIfBrelan(dice) {
		return Object.values(this.countFaces(dice)).some(n => n >= 3);
	}
	
	checkIfCarre(dice) {
		return Object.values(this.countFaces(dice)).some(n => n >= 4);
	}

	checkIfYahtzee(dice) {
		return Object.values(this.countFaces(dice)).some(n => n >= 5);
	}
	
	checkIfFull(dice) {
		return JSON.stringify(Object.values(this.countFaces(dice)).sort()) === JSON.stringify([2,3]);
	}

	checkIfPetiteSuite(dice) {
		var set = [...new Set(dice)];
		set.sort();
		if (set.length === 4) {
			return (JSON.stringify(set) === JSON.stringify([1,2,3,4]) || JSON.stringify(set) === JSON.stringify([2,3,4,5]) || JSON.stringify(set) === JSON.stringify([3,4,5,6]));
		} else if (set.length === 5) {
			return (JSON.stringify(set) !== JSON.stringify([1,2,4,5,6]) && JSON.stringify(set) !== JSON.stringify([1,2,3,5,6]));
		} else {
			return false;
		}
	}

	checkIfGrandeSuite(dice) {
		return (JSON.stringify(dice.sort()) === JSON.stringify([1,2,3,4,5]) || JSON.stringify(dice.sort()) === JSON.stringify([2,3,4,5,6]));
	}

	sumOfFace(face, dice) {
		// eslint-disable-next-line
		var filtered = dice.filter(d => d == face);
		return (filtered.length > 0 ? filtered.reduce((a,b) => a + b) : 0);
	}

	sumOfAllDice(dice) {
		return dice.reduce((a,b) => a+b);
	}

	countFaces(dice) {
		var counts = {};
		for (var i=0; i < dice.length; i++) {
			var num = dice[i];
			counts[num] = counts[num] ? counts[num] + 1 : 1;
		}
		return counts;
	}
	
	render() {
		return (
			<tr className={(this.state.used ? "used" : "")} >
				<td className="score-name">{this.props.name}</td>
				<td className="score-desc">{this.props.desc}</td>
				<td className="score-cell" onClick={this.click} onMouseOver={this.cursorOn} onMouseOut={this.cursorOff}>{this.state.scoreDisplayed}</td>
			</tr>
		)
	}

}