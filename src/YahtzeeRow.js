import React from 'react';
import "./ScoreRow.css"
import ScoreRow from './ScoreRow';

export default class YahtzeeRow extends ScoreRow {


	state = {
		used: false,
		score: 0,
		numberOfBonusYahtzees: 0,
		bonusWasCounted: false,
		scoreDisplayed: "",
		bonusDisplayed: ""
	}

	
	clickBonus = () => {
		if (!this.props.gameState.tableClicked &&  this.checkIfYahtzee(this.props.gameState.numbers)) {
			this.setState({bonusWasCounted:false}, () => {
				this.props.addScore(this.computeScoreBonus(), true);
				this.props.handleScoreClick();
			});
		}	
	}

	cursorOnBonus = () => {
		var dice = [...this.props.gameState.numbers];
		if(this.props.gameState.roll > 0 && !this.props.gameState.tableClicked && this.checkIfYahtzee(dice)) {
			if (!this.state.bonusWasCounted) {
				this.setState({numberOfBonusYahtzees: this.state.numberOfBonusYahtzees+1, bonusWasCounted:true},
					() => this.setState({bonusDisplayed: this.state.numberOfBonusYahtzees*100})
				);
			}
			this.setState({bonusDisplayed: this.state.numberOfBonusYahtzees*100});
		}
	}
	
	cursorOffBonus = () => {
		if(this.props.gameState.roll > 0 && !this.props.gameState.tableClicked && this.checkIfYahtzee(this.props.gameState.numbers)) {
			this.setState({numberOfBonusYahtzees: this.state.numberOfBonusYahtzees-1, bonusWasCounted: false}, () => {
				this.setState({bonusDisplayed: (this.state.numberOfBonusYahtzees)*100 || ""});
			})
		}
	}

	computeScore() {
		return (this.checkIfYahtzee(this.props.gameState.numbers) ? 50 : 0);
	}

	computeScoreBonus() {
		return (this.checkIfYahtzee(this.props.gameState.numbers) ? 100 : 0);
	}

	checkIfYahtzee(dice) {
		return Object.values(this.countFaces(dice)).some(n => n >= 5);
	}

	renderBonusSpace() {
		if (this.state.score > 0) {
			return (
				<td className="score-cell" onClick={this.clickBonus} onMouseOver={this.cursorOnBonus} onMouseOut={this.cursorOffBonus}>{this.state.bonusDisplayed}</td>
			);
		}
	}
	
	render() {
		return (
			<tr className={(this.state.used ? "used" : "")} >
				<td className="score-name">{this.props.name}</td>
				<td className="score-desc">{this.props.desc}</td>
				<td className="score-cell" onClick={this.click} onMouseOver={this.cursorOn} onMouseOut={this.cursorOff}>{this.state.scoreDisplayed}</td>
				{this.renderBonusSpace()}
			</tr>
		)
	}

}