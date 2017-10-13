import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import MovieSearchPreview from './MovieSearchPreview';
import { Debounce } from 'react-throttle';
export default class SearchBox extends React.Component {
constructor(props) {
	super(props);
	this.state = {searchItems:[],
				  	searchInputClass:'search-result-inline',
				  	searchTerm:''};
 	this.search = this.search.bind(this);
	this.onSearchBlur = this.onSearchBlur.bind(this);
	this.openSearchResultBox = this.openSearchResultBox.bind(this);
}

openSearchResultBox(){
	this.state.searchInputClass = 'search-result-inline open';
	this.forceUpdate();
}
onSearchBlur(e){
	
	var relatedTarget = e.relatedTarget || e.explicitOriginalTarget || document.activeElement; // IE11

	setImmediate((relatedTarget,currentTarget,god) => {
        var finalRelatedTarget = relatedTarget || document.activeElement;
		//console.log(finalRelatedTarget);
		//console.log(currentTarget);
        if (!currentTarget.contains(finalRelatedTarget) ) {
			god.state.searchInputClass = 'search-result-inline';
			god.forceUpdate();
		}
    },e.relatedTarget,e.currentTarget,this);
}
search(evt){
	if(evt.target.value==''){
		this.state.searchItems = [];
		this.state.searchInputClass = 'search-result-inline';
		this.state.searchTerm = '';
		this.forceUpdate();
		return
	}
	$.ajax({
      	url: 'http://113.161.98.44:3300/movie/search/'+evt.target.value+'/',
      	dataType: 'json',
      	success: function(response) {
			
       		this.state.searchItems = response.movies;
       		this.state.searchInputClass = 'search-result-inline open';
			this.state.searchTerm = evt.target.value;
			this.forceUpdate();
      	}.bind(this),
      	error: function(xhr, status, err) {
        	console.error(this.props.url, status, err.toString());
     	}.bind(this)
    });
}
componentDidMount(){

	
}
render() {
	
	
	return (
		<div className="movie-search" onBlur={this.onSearchBlur}>
			<i className="ts_icon ts_icon_search"></i>
			<Debounce time="400" handler="onKeyUp">
				<input type="text" placeholder="Search movie here ..." onKeyUp={this.search} onFocus={this.openSearchResultBox}/>
			</Debounce>
			<div className={this.state.searchInputClass}>
				<ul>
					{this.state.searchItems && this.state.searchItems.map(movieData => <MovieSearchPreview key={movieData.id} {...movieData} />)}
					{this.state.searchTerm && this.state.searchItems && <li className="search-all"><Link to={`/search/${this.state.searchTerm}/`}>Search all results for "{this.state.searchTerm}"</Link></li>}
					{this.state.searchTerm && !this.state.searchItems && <li className="no-result">No result for "{this.state.searchTerm}".</li>}
					{this.state.searchTerm && !this.state.searchItems && <li><Link to={`/search/`}> Try Advanced Search</Link></li>}
				</ul>
			</div>
		</div>
    );
  }
}
