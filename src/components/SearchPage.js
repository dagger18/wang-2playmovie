import React from 'react';
import { Link } from 'react-router';
import Pagination from './Pagination';
import InputRange from 'react-input-range';
import $ from 'jquery';
import { Debounce } from 'react-throttle';
import MoviePreview from './MoviePreview';
import GenresPicker from './GenresPicker';
export default class SearchPage extends React.Component {
constructor(props) {
	
	
	super(props);
	console.log(this.props.location.query.pickedGenres);
	this.state = {
            movies: [],
            total: 0,
			rating: { min: 0, max: 10 },
			keyword:typeof(this.props.params.id)!='undefined'?this.props.params.id:'',
			genres:typeof(this.props.location.query.pickedGenres)!='undefined'?[this.props.location.query.pickedGenres]:[],
			countries:[],
			pickedCountry:typeof(this.props.location.query.pickedCountry)!='undefined'?this.props.location.query.pickedCountry:'',
			pickedYear:0,
			sortie:typeof(this.props.location.query.sortie)!='undefined'?this.props.location.query.sortie:'relevant',
			currentPage:1,
			searchItems:[]
		
        };
 	this.onChangePage = this.onChangePage.bind(this);
 	this.inputRangeSlided = this.inputRangeSlided.bind(this);
 	this.inputRangeSliding = this.inputRangeSliding.bind(this);
 	this.search = this.search.bind(this);
 	this.loadData = this.loadData.bind(this);
 	this.clickGenre = this.clickGenre.bind(this);
 	this.countryChanged = this.countryChanged.bind(this);
 	this.sortieChanged = this.sortieChanged.bind(this);
 	this.yearChanged = this.yearChanged.bind(this);
}
onChangePage(page) {
	this.state.currentPage = page;
	this.loadData();
	// update state with new page of items
	/*
	$.ajax({
      	url: 'http://113.161.98.44:3300/movie/search/'+this.props.params.id+'/'+page,
      	dataType: 'json',
      	success: function(response) {
			
       		this.setState({movies: response.movies,total:response.total});
			
      	}.bind(this),
      	error: function(xhr, status, err) {
        	console.error(this.props.url, status, err.toString());
     	}.bind(this)
    });
	*/
}
loadData(){
	if(typeof($.ajax) != 'undefined'){
		$.ajax({
			url: 'http://113.161.98.44:3300/movie/search/',
			dataType: 'json',
			method:'POST',
			data:{
					'genres[]':this.state.genres,
					'pickedCountry':this.state.pickedCountry,
					'pickedYear':this.state.pickedYear,
					'ratingMax':this.state.rating.max,
					'ratingMin':this.state.rating.min,
					'keyword':this.state.keyword,
					'currentPage':this.state.currentPage,
					'sortie':this.state.sortie,
			},
			success: function(response) {

				this.state.searchItems = response.movies;
				this.state.total = response.total;
				this.forceUpdate();
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	}
}
search(evt){
	console.log('evt fired');
	const target = evt.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
	switch(name){
		case 'keyword':this.state.keyword = value;break;
	}
	
	this.loadData()
	
}
clickGenre(genre){
	console.log('proc');
	var found = false;
	for (var i = 0; i < this.state.genres.length; i++) {
	  if (this.state.genres[i] === genre) {
		found = true;
		this.state.genres.splice(i,1);
		break;
	  }
	}
	if(!found){
		this.state.genres.push(genre);
	}
	this.loadData()
}
inputRangeSliding(value){
	console.log('sliding');
	this.state.rating = value;
	this.forceUpdate();
}
inputRangeSlided(value){
	console.log('slided');
	this.loadData();
}
countryChanged(evt){
	this.state.pickedCountry = evt.target.value;
	this.loadData();
}
sortieChanged(evt){
	this.state.sortie = evt.target.value;
	this.loadData();
}
yearChanged(evt){
	this.state.pickedYear = evt.target.value;
	this.loadData();
}
componentDidUpdate(prevProps,prepState){
	console.log('updated');
	console.log(prevProps.params.id);
	console.log(this.props.params.id);
	console.log(prepState);
	console.log(this.state);
	if((typeof(prevProps.location.query.pickedGenres)=='undefined'&&typeof(this.props.location.query.pickedGenres)!='undefined')||(prevProps.location.query.pickedGenres!=this.props.location.query.pickedGenres)){
		this.state.genres = [this.props.location.query.pickedGenres];
		this.loadData();
	}
	if((typeof(prevProps.location.query.pickedCountry)=='undefined'&&typeof(this.props.location.query.pickedCountry)!='undefined')||(prevProps.location.query.pickedCountry!=this.props.location.query.pickedCountry)){
		this.state.pickedCountry = this.props.location.query.pickedCountry;
		this.loadData();
	}
	if((typeof(prevProps.location.query.sortie)=='undefined'&&typeof(this.props.location.query.sortie)!='undefined')||(prevProps.location.query.sortie!=this.props.location.query.sortie)){
		this.state.sortie = this.props.location.query.sortie;
		this.loadData();
	}
	if((typeof(prevProps.params.id)=='undefined'&&typeof(this.props.params.id)!='undefined')||(prevProps.params.id!=this.props.params.id)){
		this.state.keyword = this.props.params.id;
		this.loadData();
	}
}
componentDidMount(){
	$.ajax({
			url: 'http://113.161.98.44:3300/country/',
			dataType: 'json',
			success: function(response) {

				this.state.countries = response.countries;
				this.forceUpdate();
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	if(this.state.genres||this.state.keyword||this.state.pickedCountry||this.state.sortie!='relevant'){
		this.loadData();
	}
}
render() {
	var years = [];
	for(var i=(new Date()).getFullYear();i>=1878;i--){
		years.push(i);
	}
	
	return (
		<div className="wrapper-container">
			<div className="search-header">
				<h1>Advanced Search<div className="total-results">{this.state.total+" results"}</div></h1>
				<div className="sortie-wrapper">
					<i className="fa fa-sort-amount-desc"></i>
					<div className="select-wrapper sortie">
						<select value={this.state.sortie} onChange={this.sortieChanged}>
							<option value='relevant'>Most Relevant</option>
							<option value='newest'>Newest Movies</option>
							<option value='oldest'>Oldest Movies</option>
							<option value='best'>Rating: from high to low</option>
							<option value='worst'>Rating: from low to high</option>
							<option value='most'>Most Watched</option>
						</select>
					</div>
				</div>
				
				<div className="paging-top"><Pagination totalItems={this.state.total} currentPage={this.state.currentPage?this.state.currentPage:1} pageSize="20"  onChangePage={this.onChangePage} /></div>
			</div>
			<div className="search-filters">
				<h4 className="filter-name">Keywords</h4>
				<div className="filter-input">
					<Debounce time="400" handler="onKeyUp">
						<input name="keyword" style={{'width':'100%'}} type="text" placeholder="Title, stars, director, ..." onKeyUp={this.search} />
					</Debounce>
				</div>
				<h4 className="filter-name">Genres</h4>
				<div className="filter-input">
					<GenresPicker pickedGenres={this.state.genres} onClickGenre={this.clickGenre} genres={['Action','Adventure','Animation','Biography','Comedy','Crime','Documentary','Drama','Family','Fantasy','Film-Noir','History','Horror','Music','Musical','Mystery','News','Reality-TV','Romance','Sci-fi','Sport','Thriller','War','Western']} />
				</div>
				<h4 className="filter-name">Rating</h4>
				<div className="filter-input" style={{'margin-bottom':'15px'}}>
					<InputRange step={0.1} maxValue={10} minValue={0} value={this.state.rating} onChange={this.inputRangeSliding} onChangeComplete={this.inputRangeSlided} />
				</div>
				<div style={{'float':'left','width':'60%'}}>
					<h4 className="filter-name">Country</h4>
					<div className="filter-input">
						<div className="select-wrapper">
							<select value={this.state.pickedCountry} onChange={this.countryChanged}>
								<option value=''>Select country</option>
								{this.state.countries.map((country)=>{
									return <option value={country['country_name']}>{country['country_name']}</option>;
								})}
							</select>
						</div>
					</div>
				</div>
				<div style={{'float':'left','width':'36%','margin-left':'4%'}}>
					<h4 className="filter-name">Year</h4>
					<div className="filter-input">
						<div className="select-wrapper">
							<select value={this.state.pickedYear} onChange={this.yearChanged}>
								<option value='0'>Select one</option>
								{years.map((year)=>{
									return <option value={year}>{year}</option>;
								})}
							</select>
						</div>
					</div>
				</div>
			</div>
			<div className="search-result-grid movie-grid-body">
				<ul>{this.state.searchItems && this.state.searchItems.map(movieData => <MoviePreview key={movieData.id} {...movieData} />)}</ul>
				<div><Pagination totalItems={this.state.total} currentPage={this.state.currentPage?this.state.currentPage:1} pageSize="20"  onChangePage={this.onChangePage} /></div>
			</div>
		</div>
    );
  }
}
