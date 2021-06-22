import React from 'react';
import ReactDOM from 'react-dom';
import {CSSTransition} from 'react-transition-group';
import "../style/Help.css"

export default class Help extends React.Component {

	render() {

		return ReactDOM.createPortal(
			<CSSTransition
				in={this.props.show}
				unmountOnExit
				timeout={{enter:0, exit:300}}
			>
				<div className={`modal ${this.props.show ? 'show' : ''}`} onClick={this.props.onClose}>
					<div className="modal-content" onClick={e => e.stopPropagation()}>
						<div className="modal-header">
							<h3 className="modal-title">Comment jouer ?</h3>
						</div>				
						<div className="modal-body">
							<p>Le Yahtzee est un jeu de dés où le but est de marquer le plus de points en réalisant des combinaisons.<br/> 
								Vous pouvez lancer les dés jusqu'à 3 fois, et sélectionner les dés que vous voulez garder en cliquant dessus. Ensuite, vous devez choisir une combinaison parmi la liste.<br/>
								<br/>
								Dans la partie mineure, vous gagnez des points selon le nombre de dés égaux au chiffre correspondant.<br/>
								Dans la partie majeure, vous gagnez des points si les dés correspondent à la combinaison choisie, autrement, la ligne ne vous rapporte aucun point.<br/>
								La partie se termine lorsque toutes les lignes ont été remplies.
							</p>
							<h4>
								Combinaisons :
							</h4>
							<table>
								<tbody>
									<tr>
										<td>Brelan</td>
										<td>3 dés identiques</td>
										<td className="dice-text">⚄⚄⚄⚀⚁</td>
									</tr>
									<tr>
										<td>Carré</td>
										<td>4 dés identiques</td>
										<td className="dice-text">⚃⚃⚃⚃⚁</td>
									</tr>
									<tr>
										<td>Full</td>
										<td>3 dés identiques + 2 autres dés identiques</td>
										<td className="dice-text">⚀⚀⚀⚂⚂</td>
									</tr>
									<tr>
										<td>Petite suite</td>
										<td>4 dés dont les chiffres se suivent</td>
										<td className="dice-text">⚀⚁⚂⚃⚀</td>
									</tr>
									<tr>
										<td>Grande suite</td>
										<td>5 dés dont les chiffres se suivent</td>
										<td className="dice-text">⚁⚂⚃⚄⚅</td>
									</tr>
									<tr>
										<td>Yahtzee</td>
										<td>5 dés identiques</td>
										<td className="dice-text">⚅⚅⚅⚅⚅</td>
									</tr>
									<tr>
										<td>Chance</td>
										<td>Donne toujours la somme des dés, quels qu'ils soient.</td>
										<td></td>
									</tr>
								</tbody>
							</table>
							<h4>
								Bonus :
							</h4>
							<p>
								Si vous totalisez 63 points ou plus dans la partie mineure, vous gagnez un bonus de 35 points. <br/>
								Si vous avez déjà validé un Yahtzee et que vous en réussissez d'autres avant la fin, vous pouvez remplir la case bonus pour 100 points supplémentaires cumulables !
							</p>
						</div>				
						<div className="modal-footer">
							<button onClick={this.props.onClose}>Fermer</button>
						</div>				
					</div>
				</div>
			</CSSTransition>, 
			document.getElementById('root')
		)
	}


}
