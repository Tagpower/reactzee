import React from 'react';
import "./ScoreContainer.css"
import ScoreRow from './ScoreRow'
import TotalRow from './TotalRow';

export default class ScoreContainer extends React.Component {

	state = {
		upperScores: [],
		lowerScores: [],
		bonus: false,
		bonusYahtzee: 0,
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

	addScoreLower(score) {
		this.setState({lowerScores: [...this.state.lowerScores, score]},
			() => {
				if(this.state.lowerScores.length >= 7) {
					this.setState({lowerTotal: this.state.lowerScores.reduce((a,b) => a+b), lowerComplete:true},
					() => this.checkGameOver());
				}
			}
		);
	}

	checkGameOver() {
		if (this.state.upperComplete && this.state.lowerComplete) {
			this.props.handleGameOver(this.state.upperTotal + this.state.lowerTotal);
		}
	}

	reset() {
		this.setState({
			upperScores: [],
			lowerScores: [],
			bonus: false,
			bonusYahtzee: 0,
			upperTotal: 0,
			lowerTotal: 0,
			upperComplete: false,
			lowerComplete: false
		});
	}

	render() {
		return (
			<div className="score-grid">
				<table className="highlight">
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

				<table className="highlight">
					<thead>
						<tr>
							<th colSpan="3">
								Partie inférieure
							</th>
						</tr>
					</thead>
					<tbody>
						<ScoreRow name="Brelan" 		desc="Somme des dés" gameState={this.props.gameState} addScore={this.addScoreLower.bind(this)} handleScoreClick={this.props.handleScoreClick}/>
						<ScoreRow name="Carré" 			desc="Somme des dés" gameState={this.props.gameState} addScore={this.addScoreLower.bind(this)} handleScoreClick={this.props.handleScoreClick}/>
						<ScoreRow name="Full" 			desc="25 points" 	 gameState={this.props.gameState} addScore={this.addScoreLower.bind(this)} handleScoreClick={this.props.handleScoreClick}/>
						<ScoreRow name="Petite suite" 	desc="30 points" 	 gameState={this.props.gameState} addScore={this.addScoreLower.bind(this)} handleScoreClick={this.props.handleScoreClick}/>
						<ScoreRow name="Grande suite" 	desc="40 points" 	 gameState={this.props.gameState} addScore={this.addScoreLower.bind(this)} handleScoreClick={this.props.handleScoreClick}/>  					
						<ScoreRow name="Yahtzee" 		desc="50 points" 	 gameState={this.props.gameState} addScore={this.addScoreLower.bind(this)} handleScoreClick={this.props.handleScoreClick}/> 
						<ScoreRow name="Chance" 		desc="Somme des dés" gameState={this.props.gameState} addScore={this.addScoreLower.bind(this)} handleScoreClick={this.props.handleScoreClick}/> 
						<TotalRow name="Total" desc="partie inférieure" scoreDisplayed={this.state.lowerComplete ? this.state.lowerTotal : ""}  />
					</tbody>



				</table>
			</div>
		)
	}


}