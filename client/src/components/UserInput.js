import React from 'react'

const UserInput = (props) => {
	return (
		<>
			<div className="background-wrapper">
				<input
				className="search-bar"
				type="text"
				onChange={this.handleSearch}
			/>
			<select 
				className="radius-dropbox"
				value={this.state.radiusMiles}
				onChange={this.handleRadiusChange}
			>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
			</select>
		</div>
			<h1 className="totalResults">Total Results: {this.state.totalResults}</h1>
		</>
	)
}