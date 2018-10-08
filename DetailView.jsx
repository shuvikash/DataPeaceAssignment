import React from 'react';
import './DetailView.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class DetailView extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
			users: []
		};
		}
	//To retrieve the data before the initial render from api through  axios
	componentWillMount(){
		axios.get("http://demo9197058.mockable.io/users")
		  .then(res => {
			const users= res.data;
			this.setState({ users });
		  })
    }

	render() {
	//This will retrieve user details based on id parameter of url 
	let Id=this.props.match.params.id;
	let userDetails = this.state.users.filter((user)=>{
	return user.id === parseInt(Id)
	});	
	
	return (
	
	  <div className="container">
		  <div className="nav">
	      <h4> &ensp;<Link to="/" style={{color:"white"}}><i className="fa fa-arrow-left"></i></Link>&emsp; Data Peace</h4>
	    </div>
		  {userDetails.map((user,i) =>
		  <div key={'user_' + i}>
		  <div className="details">
		  <h3>{user.first_name}&nbsp;{user.last_name}</h3>
		  <table className="table">
		  <tbody>
		  <tr>
            <th>Company</th>
            <td>{user.company_name}</td>
          </tr>
		  <tr>
            <th>City</th>
            <td>{user.city}</td>
          </tr>
		  <tr>
            <th>State</th>
            <td>{user.state}</td>
          </tr>
		  <tr>
            <th>ZIP</th>
            <td>{user.zip}</td>
          </tr>
		  <tr>
            <th>Email</th>
            <td>{user.email}</td>
          </tr>
		  <tr>
            <th>Web</th>
            <td>{user.web}</td>
          </tr>
		  <tr>
            <th>Age</th>
            <td>{user.age}</td>
          </tr>
          </tbody>
          </table>
		  </div>
		 </div>
		  )}
        </div>
	  );
    }
}

export default DetailView;	  