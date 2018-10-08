import React from 'react';
import TableView from './TableView.jsx';
import DetailView from './DetailView.jsx';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Main extends React.Component{
	render(){
		return(		
			<Router>
				<div>
					<Route path="/" exact component={TableView} />
					<Route path="/user/:id" exact component={DetailView} />
				</div>
			</Router>
		)
	}
}

export default Main;