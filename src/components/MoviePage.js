import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import NotFoundPage from './NotFoundPage';
import $ from 'jquery';
import utf8 from 'utf8';
import CastPreview from './CastPreview';
import MoviePreview from './MoviePreview';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export default class MoviePage extends React.Component {
constructor(props) {
	super(props);
 	this.state = {
    	movie: {
		},
		width:0,
		height:0,
		played:0
  	};
	//this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	this.onLinkClick = this.onLinkClick.bind(this);
	this.love = this.love.bind(this);
	this.hate = this.hate.bind(this);
	this.watchlater = this.watchlater.bind(this);
	this.action = this.action.bind(this);
	this.play = this.play.bind(this);
}
play(evt){
	if(this.state.played==0){
		this.state.played = 1;
		this.forceUpdate();
	}
}
onLinkClick(slug,event) {
	event.stopPropagation();
	$.ajax({
      	url: 'http://113.161.98.44:3300/movie/load',
      	dataType: 'json',
		method:'POST',
		data:{
			'slug':slug,
			'user_id':!cookies.get('userId')?'0':cookies.get('userId'),
		},
      	success: function(response) {
			var popm = response.movie;
			popm.openload_id = response.openload_id;
			popm.casts = response.casts;
			popm.similars = response.similars;
			popm.isLoved = response.love;
			popm.isHated = response.hate;
			popm.isSaved = response.saved;
       		this.state.played=0;
			this.setState({movie: popm});
			//this.props.updateTitle(response.movie.name);
			console.log(this.state.movie);
			FB.XFBML.parse();
			
			var monitor = setInterval(function(){
				var elem = document.activeElement;
				if(elem && elem.tagName == 'IFRAME'){
					clearInterval(monitor);
					console.log('clicked!');
					if(this.state.played==0){
						this.state.played = 1;
						this.forceUpdate();
					}
				}
			}.bind(this), 100);
      	}.bind(this),
      	error: function(xhr, status, err) {
        	console.error(this.props.url, status, err.toString());
     	}.bind(this)
    });
	
}
love(evt){
	this.action(this.state.movie.isLoved=="1"?"-2":"2",function(that){
		that.state.movie.love = that.state.movie.isLoved=="1"?(that.state.movie.love-1):(that.state.movie.love+1);
		that.state.movie.isLoved = that.state.movie.isLoved=="1"?"0":"1";
		that.forceUpdate();
	});
}
hate(evt){
	this.action(this.state.movie.isHated=="1"?"-3":"3",function(that){
		that.state.movie.hate = that.state.movie.isHated=="1"?(that.state.movie.hate-1):(that.state.movie.hate+1);
		that.state.movie.isHated = that.state.movie.isHated=="1"?"0":"1";
		that.forceUpdate();
	});
}
watchlater(evt){
	this.action(this.state.movie.isSaved=="1"?"-4":"4",function(that){
		that.state.movie.isSaved = that.state.movie.isSaved=="1"?"0":"1";
		that.forceUpdate();
	});
}
action(relation,callback){
	$.ajax({
			url: 'http://113.161.98.44:3300/movie/action',
			dataType: 'json',
			method:'POST',
			data:{
				'relation':relation,
				'movie_id':this.state.movie.id,
				'user_id':!cookies.get('userId')?'0':cookies.get('userId'),
			},
			success: function(response) {
				callback(this);
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
}
/*
updateWindowDimensions() {
  	this.setState({ movie: this.state.movie, width: window.innerWidth, height: window.innerHeight });
	
}
*/
componentWillUnmount() {
  //window.removeEventListener('resize', this.updateWindowDimensions);
}
componentDidMount(){
	//this.updateWindowDimensions();
  	//window.addEventListener('resize', this.updateWindowDimensions);
	$.ajax({
      	url: 'http://113.161.98.44:3300/movie/load',
      	dataType: 'json',
		method:'POST',
		data:{
			'slug':this.props.params.id,
			'user_id':!cookies.get('userId')?'0':cookies.get('userId'),
		},
      	success: function(response) {
			var popm = response.movie;
			popm.openload_id = response.openload_id;
			popm.casts = response.casts;
			popm.similars = response.similars;
			popm.isLoved = response.love;
			popm.isHated = response.hate;
			popm.isSaved = response.saved;
       		this.setState({movie: popm});
			//this.props.updateTitle(response.movie.name);
			console.log(this.state.movie);
      	}.bind(this),
      	error: function(xhr, status, err) {
        	console.error(this.props.url, status, err.toString());
     	}.bind(this)
    });
	(function(d, s, id) {
	  	var js, fjs = d.getElementsByTagName(s)[0];
	  	if (d.getElementById(id)) return;
	  	js = d.createElement(s); js.id = id;
	  	js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.10";
	  	fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	/*
	setTimeout(function() { 
		$.ajax({
			url: 'http://113.161.98.44:3300/movie/action',
			dataType: 'json',
			method:'POST',
			data:{
				'relation':1,
				'movie_id':this.state.movie.id,
				'user_id':!cookies.get('userId')?'0':cookies.get('userId'),
			},
			success: function(response) {

			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	}.bind(this), 3000);
	*/
	var monitor = setInterval(function(){
		var elem = document.activeElement;
		if(elem && elem.tagName == 'IFRAME'){
			clearInterval(monitor);
			console.log('clicked!');
			if(this.state.played==0){
				this.state.played = 1;
				this.forceUpdate();
			}
		}
	}.bind(this), 100);
}

render() {
	var genres = [];
	var genres_short = '';
	if( typeof(this.state.movie.genres)!='undefined' ){
		genres = this.state.movie.genres.split(',');
		genres = genres.slice(0,3);
		genres_short = genres.join('&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;');
	}
	
	return (
		<div className="movie-page">
			<div className={"movie-page-player "+(this.state.played==0?'':'played')}>
				{this.state.movie.openload_id && (<iframe scrolling="no" style={{color:"#000",margin:"-155px 0px 0"}} src={"https://openload.co/embed/"+this.state.movie.openload_id+"/"} scrolling="no" frameborder="0" width="1100px" height="620px" allowFullScreen></iframe>)}
				<div className="wrapper-container" style={{position:'relative'}}>
					<div className="movie-page-left dummy">
						<div className="movie-page-left-left">
							{this.state.movie.slug && (<img className="poster" src={"/img/poster-"+this.state.movie.slug+".jpg"} />)}
						</div>
						<div className="movie-page-left-right">
							<div className="movie-page-left-right-upper">
								{this.state.movie.year && (<div className="year">{this.state.movie.year}</div>)}
								<div className="title">
									{this.state.movie.name && utf8.decode(this.state.movie.name)}
									{this.state.movie.contentRating && (<span className="contentRating">{this.state.movie.contentRating}</span>)}
								</div>
								{this.state.movie.releaseDate && (<div className="releaseDate">{utf8.decode(this.state.movie.releaseDate)}</div>)}

								<div className="rating">
									<div className="stars-wrapper">
										<div className="stars">
											<div className="red-stars" style={{width:(this.state.movie.rating-0<0?'0':(this.state.movie.rating-0<2?((this.state.movie.rating-0)*50):100))+"%"}}></div>
										</div>
										<div className="stars">
											<div className="red-stars" style={{width:(this.state.movie.rating-2<0?'0':(this.state.movie.rating-2<2?((this.state.movie.rating-2)*50):100))+"%"}}></div>
										</div>
										<div className="stars">
											<div className="red-stars" style={{width:(this.state.movie.rating-4<0?'0':(this.state.movie.rating-4<2?((this.state.movie.rating-4)*50):100))+"%"}}></div>
										</div>
										<div className="stars">
											<div className="red-stars" style={{width:(this.state.movie.rating-6<0?'0':(this.state.movie.rating-6<2?((this.state.movie.rating-6)*50):100))+"%"}}></div>
										</div>
										<div className="stars">
											<div className="red-stars" style={{width:(this.state.movie.rating-8<0?'0':(this.state.movie.rating-8<2?((this.state.movie.rating-8)*50):100))+"%"}}></div>
										</div>
									</div>
									<div className="badge">IMDb {this.state.movie.rating}</div>
								</div>
								<div className="genres-and-length">
									{this.state.movie.length && (<div className="length">{this.state.movie.length}</div>)}
									{this.state.movie.genres && (<div className="genres" dangerouslySetInnerHTML={{__html: genres_short}}></div>)}

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="movie-page-bottom">
				<div className="wrapper-container">	
					<div className="movie-page-left">
						<div className="movie-page-left-left">
							{this.state.movie.slug && (<img className="poster" src={"/img/poster-"+this.state.movie.slug+".jpg"} />)}
							<h4 className="movie-page-block-title block-title">Movie Details</h4>
							<div className="movie-page-block-content block-content movie-details">
								<ul>
									{this.state.movie.director && (<li><span>Directed:</span><span>{utf8.decode(this.state.movie.director)}</span></li>)}
									{this.state.movie.writer && (<li><span>Writers:</span><span>{utf8.decode(this.state.movie.writer)}</span></li>)}
									{this.state.movie.producer && (<li><span>Producer:</span><span>{utf8.decode(this.state.movie.producer)}</span></li>)}
									{this.state.movie.stars && (<li><span>Stars:</span><span>{utf8.decode(this.state.movie.stars)}</span></li>)}
									{this.state.movie.country && (<li><span>Country:</span><span>{utf8.decode(this.state.movie.country.replace(/,([^\s])/g, ", $1"))}</span></li>)}
									{this.state.movie.awards && (<li><span>Awards:</span><span>{utf8.decode(this.state.movie.awards)}</span></li>)}
									{this.state.movie.budget && (<li><span>Budget:</span><span>{utf8.decode(this.state.movie.budget)}</span></li>)}
									{this.state.movie.opening && (<li><span>Opening:</span><span>{utf8.decode(this.state.movie.opening)}</span></li>)}
									{this.state.movie.gross && (<li><span>Gross:</span><span>{utf8.decode(this.state.movie.gross)}</span></li>)}
								</ul>
							</div>
						</div>
						<div className="movie-page-left-right">
							<div className="movie-page-left-right-upper">
								{this.state.movie.year && (<div className="year">{this.state.movie.year}</div>)}
								<div className="title">
									{this.state.movie.name && utf8.decode(this.state.movie.name)}
									{this.state.movie.contentRating && (<span className="contentRating">{this.state.movie.contentRating}</span>)}
								</div>
								{this.state.movie.releaseDate && (<div className="releaseDate">{utf8.decode(this.state.movie.releaseDate)}</div>)}

								<div className="rating">
									<div className="stars-wrapper">
										<div className="stars">
											<div className="red-stars" style={{width:(this.state.movie.rating-0<0?'0':(this.state.movie.rating-0<2?((this.state.movie.rating-0)*50):100))+"%"}}></div>
										</div>
										<div className="stars">
											<div className="red-stars" style={{width:(this.state.movie.rating-2<0?'0':(this.state.movie.rating-2<2?((this.state.movie.rating-2)*50):100))+"%"}}></div>
										</div>
										<div className="stars">
											<div className="red-stars" style={{width:(this.state.movie.rating-4<0?'0':(this.state.movie.rating-4<2?((this.state.movie.rating-4)*50):100))+"%"}}></div>
										</div>
										<div className="stars">
											<div className="red-stars" style={{width:(this.state.movie.rating-6<0?'0':(this.state.movie.rating-6<2?((this.state.movie.rating-6)*50):100))+"%"}}></div>
										</div>
										<div className="stars">
											<div className="red-stars" style={{width:(this.state.movie.rating-8<0?'0':(this.state.movie.rating-8<2?((this.state.movie.rating-8)*50):100))+"%"}}></div>
										</div>
									</div>
									<div className="badge">IMDb {this.state.movie.rating}</div>
								</div>
								<div className="genres-and-length">
									{this.state.movie.length && (<div className="length">{this.state.movie.length}</div>)}
									{this.state.movie.genres && (<div className="genres" dangerouslySetInnerHTML={{__html: genres_short}}></div>)}

								</div>
								
								<div className="movie-page-block-content block-content" style={{'line-height':'25px','padding-top':'15px'}}>
									{this.state.movie.summary && utf8.decode(this.state.movie.description)}
								</div>
							</div>
							<h4 className="movie-page-block-title block-title">Cast Overview</h4>
							<div className="movie-page-block-content block-content movie-casts">
								<ul>{this.state.movie.casts && this.state.movie.casts.map(castData => <CastPreview key={castData.id} {...castData} />)}</ul>
							</div>
							
						</div>
						<h4 style={{'overflow':'hidden','width':'100%','padding-top':'20px'}} className="movie-page-block-title block-title">Similar Movies</h4>
						<div className="movie-page-block-content block-content movie-grid-body similars">
							<ul>{this.state.movie.similars && this.state.movie.similars.map(movieData => <MoviePreview on_link_click={this.onLinkClick} key={movieData.id} {...movieData} />)}</ul>
						</div>
					</div>
					<div className="movie-page-right">
						<div className="user-interact">
							{this.state.movie.views && <div className="views">{this.state.movie.views.toLocaleString()} <span>views</span></div>}
							<div className="love-hate">
								{this.state.movie.love && <div onClick={this.love} className={"love "+(this.state.movie.isLoved=="1"?"active":"")} style={{'width':'70%'}}><span><i className="ts_icon ts_icon_heart_large_filled"></i>{this.state.movie.love} loved</span></div>}
								{this.state.movie.hate && <div onClick={this.hate} className={"hate "+(this.state.movie.isHated=="1"?"active":"")}><span><i className="ts_icon ts_icon_eye_closed"></i>{this.state.movie.hate}</span></div>}
							</div>
							<div className="action">
								<div className={"watchlater "+(this.state.movie.isSaved=="1"?"active":"")} onClick={this.watchlater}><i className="ts_icon ts_icon_history"></i><span>{this.state.movie.isSaved=="1"?"Saved":"Watch Later"}</span></div>
								<div className="watchlater"><i className="ts_icon ts_icon_flag"></i><span>Report</span></div>
								<div className="watchlater"><i className="ts_icon ts_icon_share_action"></i><span>Share</span></div>
							</div>
						</div>
						{window && (<div><div id="fb-root"></div>
									<div className="fb-comments" data-href={window.location.href} data-width="100%" data-numposts="5"></div></div>)}
					</div>
				</div>
			</div>
		</div>
	
    );
  }
}
