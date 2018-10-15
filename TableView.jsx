import React from 'react';
import axios from 'axios';
import './TableView.css';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";

class TableView extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
           users: [],
		   searchText: "",
		   sortOrder:'ASC',
		   currentPage: 1,
           itemPerPage: 5,
		   activePage: 2
		};
		this.detailView=this.detailView.bind(this);
		this.ascCompareBy=this.ascCompareBy.bind(this);
		this.dscCompareBy=this.dscCompareBy.bind(this);
		this.sortBy=this.sortBy.bind(this);
		this.handleSearchText=this.handleSearchText.bind(this);
		this.handleNextClick = this.handleNextClick.bind(this);
		this.handlePreviousClick = this.handlePreviousClick.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
	}
	
	handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber,currentPage: pageNumber});
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
    handleNextClick() {
		const page=Math.ceil(this.state.users.length / this.state.itemPerPage);
		if(this.state.currentPage<page)
		{
		const next=this.state.currentPage+1;
        this.setState({
         currentPage: next,activePage: next
		});
		}
    }
	handlePreviousClick() {
		if(this.state.currentPage>1)
		{
		const next=this.state.currentPage-1;
        this.setState({
         currentPage: next,activePage: next
		});
		}
    }
	render() {

	//Filter the users based on searching text
	let filteredUsers = this.state.users.filter((user)=>{
      return user.first_name.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !==-1;
		});
	// Logic for displaying users
    const indexOfLastUser = this.state.currentPage * this.state.itemPerPage;
    const indexOfFirstUser = indexOfLastUser - this.state.itemPerPage;
	/*if(this.state.searchText)
	currentUser = filteredUsers.slice(0,5);	
	else*/
    const currentUser = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
		
	// Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.users.length / this.state.itemPerPage); i++) {
      pageNumbers.push(i);
    }
     
    const renderPageNumbers = pageNumbers.map(number => {
      return (
	  <a href="#" key={number} id={number} onClick={this.handleClick}>{number}</a>
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
		 {this.state.currentPage*5-4}-{this.state.currentPage*5}
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
	  currentUser.map((user,i) => 
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
        <button type="button" className="btn btn-default" style={{marginRight:'895px'}} onClick={this.handlePreviousClick}>Previous</button>
        <button type="button" className="btn btn-default" onClick={this.handleNextClick}>Next</button>
      </div>
      <div>
	   <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.itemPerPage}
          totalItemsCount={Math.ceil(this.state.users.length)}
          pageRangeDisplayed={10}
          onChange={this.handlePageChange}
       />
	   </div>
	</div>
	);
    }
}

export default TableView;