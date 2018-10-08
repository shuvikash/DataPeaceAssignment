import React from 'react';
import axios from 'axios';
import './TableView.css';
import { Link } from 'react-router-dom';

class TableView extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
           users: [],
		   searchText: "",
		   sortOrder:'ASC',
		   currentPage: 1,
           itemPerPage: 5
		};
		this.detailView=this.detailView.bind(this);
		this.ascCompareBy=this.ascCompareBy.bind(this);
		this.dscCompareBy=this.dscCompareBy.bind(this);
		this.sortBy=this.sortBy.bind(this);
		this.handleSearchText=this.handleSearchText.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	detailView(id) {
		window.location='/user/'+id;
    }
	//To retrieve the data before the initial render from api through  axios
	componentWillMount(){
		axios.get("http://demo9197058.mockable.io/users")
		  .then(res => {
			const users= res.data;
			this.setState({ users });
		  })
    }
	//Ascending order comparision
    ascCompareBy(key) {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
     };
    }
	//Descending order comparision
    dscCompareBy(key) {
    return function (a, b) {
      if (a[key] > b[key]) return -1;
      if (a[key] < b[key]) return 1;
      return 0;
     };
    }
    //Sort the column data based on given key
    sortBy(key) {
    let arrayCopy = [...this.state.users];
	if(this.state.sortOrder==='ASC')
	{
    arrayCopy.sort(this.ascCompareBy(key));
    this.setState({users: arrayCopy,sortOrder: 'DSC'});
	}
	else{
	arrayCopy.sort(this.dscCompareBy(key));
    this.setState({users: arrayCopy,sortOrder: 'ASC'});
	}
   }
   //will set text for filtering the value of users
    handleSearchText(e) {
		this.setState({ searchText: e.target.value });
    }
    handleClick(event) {
        this.setState({
         currentPage: Number(event.target.id)
       });
    }
	render() {
	//Filter the users based on searching text
	let filteredUsers = this.state.users.filter((user)=>{
      return user.first_name.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !==-1;
	});
	
	// Logic for displaying users
    const indexOfLastUser = this.state.currentPage * this.state.itemPerPage;
    const indexOfFirstUser = indexOfLastUser - this.state.itemPerPage;
    const currentUser = this.state.users.slice(indexOfFirstUser, indexOfLastUser);
	
	// Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.users.length / this.state.itemPerPage); i++) {
      pageNumbers.push(i);
    }
     
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });
	return (
	<div className="container">
	  <div className="header">
	  <h4> &ensp;&#9776; &emsp; Data Peace</h4>
	  </div>
	  <div>
	  <form>
         <input type="text" placeholder="Search by first name" onChange={this.handleSearchText} className="search" style={{backgroundImage:"url('search.png')",backgroundSize:"25px 20px"}}/>
	  </form>
	</div>
	<div className="table-responsive"> 	  
    <table className="list">
     <thead>
      <tr className="tableheader">
	    <th onClick={e => this.sortBy('first_name')}>&#9660;First Name</th>
        <th onClick={e => this.sortBy('last_name')}>&#9660;Last Name</th>
        <th onClick={e => this.sortBy('company_name')}>&#9660;Company Name</th>
        <th onClick={e => this.sortBy('city')}>&#9660;City</th>
		<th onClick={e => this.sortBy('state')}>&#9660;State</th>
        <th onClick={e => this.sortBy('zip')}>&#9660;Zip</th>
		<th onClick={e => this.sortBy('email')}>&#9660;Email</th>
		<th onClick={e => this.sortBy('web')}>&#9660;Web</th>
		<th onClick={e => this.sortBy('age')}>&#9660;Age</th>
      </tr>
     </thead>
     <tbody>
	  { 
	  filteredUsers.map((user,i) => 
	  <tr key={'user_' + i} onClick={()=>{this.detailView(user.id)}}>
	    <td>{user.first_name}</td>
	    <td>{user.last_name}</td>
	    <td>{user.company_name}</td>
	    <td>{user.city}</td>
	    <td>{user.state}</td>
	    <td>{user.zip}</td>
	    <td>{user.email}</td>
	    <td>{user.web}</td>
	    <td>{user.age}</td>
	  </tr>
	  )}
      </tbody>
    </table>
   </div>
      <div className="np-btn">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
        <button type="button" className="btn btn-default" style={{marginRight:'895px'}}>Previous</button>
         <button type="button" className="btn btn-default">Next</button>
      </div>
      <div className="pagination">
          <a href="#">&laquo;</a>
          <a href="#">1</a>
          <a className="active" href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">5</a>
          <a href="#">6</a>
          <a href="#">7</a>
          <a href="#">8</a>
          <a href="#">9</a>
          <a href="#">&raquo;</a>
       </div>
	</div>
	);
    }
}

export default TableView;