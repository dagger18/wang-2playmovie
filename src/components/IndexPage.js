import React from 'react';
import MoviePreview from './MoviePreview';
import MovieCarouselPreview from './MovieCarouselPreview';
import $ from 'jquery';
import { Link } from 'react-router';
import Slider from 'react-slick';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


function SampleNextArrow(props) {
  const {className, style, onClick} = props
  return (
    <div
      className={className}
      style={{style, display: 'block', background: 'url(/images/slider-right.png)' , height:'44px', right:'-50px', width:'32px'}}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const {className, style, onClick} = props
  return (
    <div
      className={className}
      style={{style, display: 'block', background: 'url(/images/slider-left.png)' , height:'44px', left:'-50px', width:'32px'}}
      onClick={onClick}
    ></div>
  );
}


export default class IndexPage extends React.Component {
constructor(props) {
	super(props);
 	this.state = {
    	movies: {
			slider:[],
			recommended:[],
			most:[],
			best:[],
			all:[],
			comedy:[],
			horror:[],
			action:[],
			romance:[]
		},
		current_slide:3,
		suggestion_active_tab:1,
		genre_active_tab:1
  	};
	this.onSlideHover = this.onSlideHover.bind(this)
	this.suggestionTabChange = this.suggestionTabChange.bind(this)
	var post_data = {};
	$.ajax({
      	url: 'http://113.161.98.44:3300/movie/index',
      	dataType: 'json',
		method:'POST',
		data:{
			'user_id':!cookies.get('userId')?'0':cookies.get('userId')
		},
      	success: function(data) {
	
       		this.setState({movies: data});
			
      	}.bind(this),
      	error: function(xhr, status, err) {
        	console.error(this.props.url, status, err.toString());
     	}.bind(this)
    });
}
suggestionTabChange(tab,type){
	this.setState({suggestion_active_tab:tab});
	if(!this.state.movies[type]){
		$.ajax({
			url: 'http://113.161.98.44:3300/movie/index/'+type,
			dataType: 'json',
			success: function(response) {
				var this_movies = this.state.movies;
				this_movies[type] = response.results;
				this.setState({movies: this_movies});
				console.log(this.state.movies);

			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	}
}
genreTabChange(tab,type){
	this.setState({genre_active_tab:tab});
	if(!this.state.movies[type]){
		$.ajax({
			url: 'http://113.161.98.44:3300/movie/index/'+type,
			dataType: 'json',
			success: function(response) {
				var this_movies = this.state.movies;
				this_movies[type] = response.results;
				this.setState({movies: this_movies});

			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	}
}
onSlideHover(index,event) {
	event.stopPropagation();
	if(this.state.current_slide!=index){
		this.state.current_slide = index;
		this.forceUpdate();
		//console.log('proc on parent, send from child '+index);
	}else{
		//console.log('hover on current slide');
	}
}
render() {
	var self = this;
	clearTimeout(self.autoPlay);
	if(self.state.current_slide+3<29){
		self.autoPlay = setTimeout(function(){
			self.refs.HomeSlider.slickNext();
		},3000);
	}
	
	var settings = {
      	dots: false,
		draggable: false,
		swipe: false,
		swipeToSlide: false,
		touchMove: false,
      	infinite: false,
		autoplay:false,
      	speed: 500,
      	slidesToShow: 7,
      	slidesToScroll: 1,
		beforeChange: function (currentSlide, nextSlide) {
			
			
		},
		afterChange: function (currentSlide) {
			
			self.state.current_slide = currentSlide+3;
			self.forceUpdate();
			console.log(self.refs.HomeSlider);
			/*autoPlay = setTimeout(function(){
				self.refs.HomeSlider.slickNext();
			},3000);*/
			
		},
		nextArrow: <SampleNextArrow />,
      	prevArrow: <SamplePrevArrow />
    };
	return (
	<div>
		<div className="movie-slider">
			<div className="darker"></div>
			<div className="wrapper-container">
				{this.state.movies.slider.length &&
					<Slider ref="HomeSlider" {...settings}>
						{this.state.movies.slider.map((movieCarouselData,index) => ( <div><MovieCarouselPreview current_slide={this.state.current_slide} on_slide_hover={this.onSlideHover} index={index} key={movieCarouselData.id} {...movieCarouselData} /></div> ))}
					</Slider>
				}
			</div>
		</div>
		<div className="wrapper-container">
			<div className="index-banner">
				<h3>Watch free movies online</h3>
				<h4>2playmovie.com - just a faster and better place for watching online movies for free.</h4>
			</div>
			<div className="movie-grid recommended">
				<div className="movie-grid-header">
					<div className="movie-grid-title">Suggestion</div>
					<div className="movie-grid-tabs-header">
						<div className={"movie-grid-tab-header "+(this.state.suggestion_active_tab==1?"active":"")} onClick={()=>this.suggestionTabChange(1,'recommended')}>
							Recommended
						</div>
						<div className={"movie-grid-tab-header "+(this.state.suggestion_active_tab==2?"active":"")} onClick={()=>this.suggestionTabChange(2,'most')}>
							Most Watched
						</div>
						<div className={"movie-grid-tab-header "+(this.state.suggestion_active_tab==3?"active":"")} onClick={()=>this.suggestionTabChange(3,'best')}>
							Top IMDB
						</div>
					</div>
					<div className="movie-grid-tool">
						<Link to={`/`}>View All</Link>
					</div>
				</div>
				<div className={"movie-grid-body "+(this.state.suggestion_active_tab==1?"active":"hidden")}>
					<ul>{this.state.movies.recommended && this.state.movies.recommended.map(movieData => <MoviePreview key={movieData.id} {...movieData} />)}</ul>
				</div>
				<div className={"movie-grid-body "+(this.state.suggestion_active_tab==2?"active":"hidden")}>
					<ul>{this.state.movies.most && this.state.movies.most.map(movieData => <MoviePreview key={movieData.id} {...movieData} />)}</ul>
				</div>
				<div className={"movie-grid-body "+(this.state.suggestion_active_tab==3?"active":"hidden")}>
					<ul>{this.state.movies.best && this.state.movies.best.map(movieData => <MoviePreview key={movieData.id} {...movieData} />)}</ul>
				</div>
			</div>
			<div className="movie-grid newest-by-genre">
				<div className="movie-grid-header">
					<div className="movie-grid-title">Latest movies online</div>
					<div className="movie-grid-tabs-header">
						<div className={"movie-grid-tab-header "+(this.state.genre_active_tab==1?"active":"")} onClick={()=>this.genreTabChange(1,'all')}>
							All
						</div>
						<div className={"movie-grid-tab-header "+(this.state.genre_active_tab==2?"active":"")} onClick={()=>this.genreTabChange(2,'action')}>
							Action Movies
						</div>
						<div className={"movie-grid-tab-header "+(this.state.genre_active_tab==3?"active":"")} onClick={()=>this.genreTabChange(3,'comedy')}>
							Comedy Movies
						</div>
						<div className={"movie-grid-tab-header "+(this.state.genre_active_tab==4?"active":"")} onClick={()=>this.genreTabChange(4,'horror')}>
							Horror Movies
						</div>
						<div className={"movie-grid-tab-header "+(this.state.genre_active_tab==5?"active":"")} onClick={()=>this.genreTabChange(5,'romance')}>
							Romance Movies
						</div>
					</div>
					<div className="movie-grid-tool">
						<Link to={`/`}>View All</Link>
					</div>
				</div>
				<div className={"movie-grid-body "+(this.state.genre_active_tab==1?"active":"hidden")}>
					<ul>{this.state.movies.all && this.state.movies.all.map(movieData => <MoviePreview key={movieData.id} {...movieData} />)}</ul>
				</div>
				<div className={"movie-grid-body "+(this.state.genre_active_tab==2?"active":"hidden")}>
					<ul>{this.state.movies.action && this.state.movies.action.map(movieData => <MoviePreview key={movieData.id} {...movieData} />)}</ul>
				</div>
				<div className={"movie-grid-body "+(this.state.genre_active_tab==3?"active":"hidden")}>
					<ul>{this.state.movies.comedy && this.state.movies.comedy.map(movieData => <MoviePreview key={movieData.id} {...movieData} />)}</ul>
				</div>
				<div className={"movie-grid-body "+(this.state.genre_active_tab==4?"active":"hidden")}>
					<ul>{this.state.movies.horror && this.state.movies.horror.map(movieData => <MoviePreview key={movieData.id} {...movieData} />)}</ul>
				</div>
				<div className={"movie-grid-body "+(this.state.genre_active_tab==5?"active":"hidden")}>
					<ul>{this.state.movies.romance && this.state.movies.romance.map(movieData => <MoviePreview key={movieData.id} {...movieData} />)}</ul>
				</div>
			</div>
			<div className="movie-grid newest"></div>
			<div className="movie-grid recommended"></div>
			<div className="movie-grid mostwatched"></div>
		</div>
	</div>
    );
  }
}
