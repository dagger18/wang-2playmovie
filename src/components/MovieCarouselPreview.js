import React from 'react';
import { Link } from 'react-router';

export default class MovieCarouselPreview extends React.Component {
 
render() {
    return (
		<div  className={"movie-slide "+ (this.props.index == this.props.current_slide ? (" active "):"") + ( ((this.props.current_slide - this.props.index ) > 0 && (this.props.current_slide - this.props.index) <3)?"left":"right" )}>
			<img src={"/img/poster-"+this.props.slug+".jpg"} />
			<div className="dark"></div>
			<div onMouseOver={(evt)=>this.props.on_slide_hover(this.props.index,evt)} className="movie-slide-preview" >
				<div className="name">{this.props.name}</div>
				<div className="info">
					<div className="poster-and-play">
						<img className="poster" src={"/img/poster-"+this.props.slug+".jpg"} />
						<Link className="play" to={`/movie/${this.props.slug}`}>
							<img src="/images/play_icon.png"/>
						</Link>
						<div className="hover-info">
							<div className="release">{this.props.releaseDate}</div>
							<div className="genres">{this.props.genres}</div>
							<div className="description">{this.props.description}</div>
							<div className="director">Director: <span>{this.props.director}</span></div>
							<div className="stars">Stars: <span>{this.props.stars}</span></div>
							<div className="imdb">{this.props.rating}</div>
						</div>
					</div>
					<div className="tools">
						<div className="down"><Link to={`/movie/${this.props.slug}/download`}><div><i className="ts_icon ts_icon_cloud_download"></i></div>Download</Link></div>
						<div className="like"><Link to={`/movie/${this.props.slug}/like`}><div><img src="/images/like-button.png"/></div>Like it</Link></div>
						<div className="share"><Link to={`/movie/${this.props.slug}/share`}><div><img src="/images/share-button.png"/></div>Share</Link></div>
						<div className="score">
							<img src={"/images/star-"+(this.props.rating<0?"black":"red")+".png"}/>
							<img src={"/images/star-"+(this.props.rating<2?"black":"red")+".png"}/>
							<img src={"/images/star-"+(this.props.rating<4?"black":"red")+".png"}/>
							<img src={"/images/star-"+(this.props.rating<6?"black":"red")+".png"}/>
							<img src={"/images/star-"+(this.props.rating<8?"black":"red")+".png"}/>
						</div>
					</div>
				</div>
			</div>
		</div>
    );
  }
}
