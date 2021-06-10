import React from 'react';
import "../style/TotalRow.css"

export default class TotalRow extends React.Component {

	render() {
		return (
			<tr className="total">
				<td className="score-name">{this.props.name}</td>
				<td className="score-desc">{this.props.desc}</td>
				<td className="score-cell">{this.props.scoreDisplayed}</td>
			</tr>
		)
	}

}