import React from 'react';
import "../style/ScoreContainer.css"
import ScoreRow from './ScoreRow'
import TotalRow from './TotalRow';
import YahtzeeRow from './YahtzeeRow';

export default class ScoreContainer extends React.Component {

	state = {
		upperScores: [],
		lowerScores: [],
		bonus: false,
		numberOfBonusYahtzees: 0,
		upperTotal: 0,
		lowerTotal: 0,
		upperComplete: false,
		lowerComplete: false
	}

	addScoreUpper(score) {
		this.setState(
			{upperScores: [...this.state.upperScores, score]},
			() => {
				if(this.state.upperScores.length >= 6) {
					this.setState({upperTotal: this.state.upperScores.reduce((a,b) => a+b), upperComplete:true},
					() => {
						if (this.state.upperTotal >= 63) {
							this.setState({bonus:true, upperTotal: this.state.upperTotal+35}, () => this.checkGameOver());
						} else {
							this.checkGameOver();
						}
					});
				}
			}
		);
	}

	addScoreLower(score, yahtzee) {
		var self = this;
		const checkIfComplete = function() {
			if(self.state.lowerScores.length >= 7 + self.state.numberOfBonusYahtzees) {
				self.setState({lowerTotal: self.state.lowerScores.reduce((a,b) => a+b), lowerComplete:true},
				() => self.checkGameOver());
			}
		}

		this.setState({lowerScores: [...this.state.lowerScores, score]},
			() => {
				if (yahtzee === true) {
					this.setState({numberOfBonusYahtzees: this.state.numberOfBonusYahtzees+1}, () => checkIfComplete());
				}
				checkIfComplete()
			}
		);
	}

	checkGameOver() {
		if (this.state.upperComplete && this.state.lowerComplete) {
			this.props.handleGameOver(this.state.upperTotal + this.state.lowerTotal);
		}
	}

	render() {
		return (
			<div className="score-grid">
				<table>
					<thead>
						<tr>
							<th colSpan="3">
								Partie supérieure
							</th>
						</tr>
					</thead>
					<tbody>
						<ScoreRow name="1" desc="Somme des 1" gameState={this.props.gameState} addScore={this.addScoreUpper.bind(this)} handleScoreClick={this.props.handleScoreClick}/>  
						<ScoreRow name="2" desc="Somme des 2" gameState={this.props.gameState} addScore={this.addScoreUpper.bind(this)} handleScoreClick={this.props.handleScoreClick}/> 
						<ScoreRow name="3" desc="Somme des 3" gameState={this.props.gameState} addScore={this.addScoreUpper.bind(this)} handleScoreClick={this.props.handleScoreClick}/>  
						<ScoreRow name="4" desc="Somme des 4" gameState={this.props.gameState} addScore={this.addScoreUpper.bind(this)} handleScoreClick={this.props.handleScoreClick}/> 
						<ScoreRow name="5" desc="Somme des 5" gameState={this.props.gameState} addScore={this.addScoreUpper.bind(this)} handleScoreClick={this.props.handleScoreClick}/>  
						<ScoreRow name="6" desc="Somme des 6" gameState={this.props.gameState} addScore={this.addScoreUpper.bind(this)} handleScoreClick={this.props.handleScoreClick}/> 
						<TotalRow name="Bonus" desc="+35 si total >= 63" scoreDisplayed={this.state.upperComplete ? (this.state.bonus ? "35" : "0") : ""}  />
						<TotalRow name="Total" desc="partie supérieure" scoreDisplayed={this.state.upperComplete ? this.state.upperTotal : ""}  />
					</tbody>
				</table>

				<table>
					<thead>
						<tr>
							<th colSpan="3">
								Partie inférieure
							</th>
						</tr>
					</thead>
					<tbody>
						<ScoreRow name="Brelan" 	  tip="3 dés ou plus égaux"	desc="Somme des dés" gameState={this.props.gameState} addScore={this.addScoreLower.bind(this)} handleScoreClick={this.props.handleScoreClick}/>
						<ScoreRow name="Carré" 		  tip="4 dés ou plus égaux"	desc="Somme des dés" gameState={this.props.gameState} addScore={this.addScoreLower.bind(this)} handleScoreClick={this.props.handleScoreClick}/>
						<ScoreRow name="Full" 		  tip="3 dés égaux + 2 dés égaux"	desc="25 points" 	 gameState={this.props.gameState} addScore={this.addScoreLower.bind(this)} handleScoreClick={this.props.handleScoreClick}/>
						<ScoreRow name="Petite suite" tip="4 dés consécutifs"	desc="30 points" 	 gameState={this.props.gameState} addScore={this.addScoreLower.bind(this)} handleScoreClick={this.props.handleScoreClick}/>
						<ScoreRow name="Grande suite" tip="5 dés consécutifs"	desc="40 points" 	 gameState={this.props.gameState} addScore={this.addScoreLower.bind(this)} handleScoreClick={this.props.handleScoreClick}/>  					
						{/* <ScoreRow name="Yahtzee" 		desc="50 points" 	 gameState={this.props.gameState} addScore={this.addScoreLower.bind(this)} handleScoreClick={this.props.handleScoreClick}/>  */}
						<YahtzeeRow name="Yahtzee" 	  tip="5 dés égaux"			desc="50 points" 	 gameState={this.props.gameState} addScore={this.addScoreLower.bind(this)} handleScoreClick={this.props.handleScoreClick}/> 
						<ScoreRow name="Chance" 	  tip="Somme des dés"	desc="Somme des dés" gameState={this.props.gameState} addScore={this.addScoreLower.bind(this)} handleScoreClick={this.props.handleScoreClick}/> 
						<TotalRow name="Total" desc="partie inférieure" scoreDisplayed={this.state.lowerComplete ? this.state.lowerTotal : ""}  />
					</tbody>



				</table>
			</div>
		)
	}


}