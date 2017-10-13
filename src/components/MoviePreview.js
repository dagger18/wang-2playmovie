import React from 'react';
import { Link } from 'react-router';
import utf8 from 'utf8';
export default class MoviePreview extends React.Component {
  render() {
    return (
		<li>
			<Link onClick={(evt)=>this.props.on_link_click(this.props.slug,evt)} className="movie-grid-movie"  to={`/movie/${this.props.slug}`}>
				<div><img src={"/img/poster-"+this.props.slug+".jpg"} /></div>
				<div className="name-and-score">
					<div className="name">{utf8.decode(this.props.name)}</div>
					<div className="score">{this.props.rating}</div>
				</div>
				<div className="genres">{this.props.genres.split(',',3)[0]+(this.props.genres.split(',',3).length>1?(", "+this.props.genres.split(',',3)[1]):'')}</div>
			</Link>
			<div className="movie-grid-movie-preview" >
				<div className="name-and-length">
					<div className="name">{utf8.decode(this.props.name)}</div>
					<div className="length">{this.props.length}</div>
				</div>
				<div className="genres">
					{this.props.genres}
				</div>
				<div className="short-summary">
					{utf8.decode(this.props.description)}
				</div>
				<div className="director">
					Director: <a>{utf8.decode(this.props.director)}</a>
				</div>
				<div className="releaseDate">
					{this.props.releaseDate}
				</div>
				<div className="imdb-and-contentRating">
					<div className="imdb">{this.props.rating}</div>
					<div className="watch"><Link className="w-button" to={`/movie/${this.props.slug}`}>Watch</Link></div>
				</div>
				<div className="cast-list">
					<ul>
						
					</ul>
				</div>
			</div>
		</li>
    );
  }
}
