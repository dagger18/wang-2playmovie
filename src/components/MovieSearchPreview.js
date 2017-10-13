import React from 'react';
import { Link } from 'react-router';
import utf8 from 'utf8';
export default class MovieSearchPreview extends React.Component {
  render() {
    return (
		<li>
			<Link onClick={(evt)=>this.props.on_link_click(this.props.slug,evt)} className="movie-search-block"  to={`/movie/${this.props.slug}`}>
				<div><img src={"/img/poster-"+this.props.slug+".jpg"} /></div>
				<div className="name-and-year">
					<div className="name">{utf8.decode(this.props.name)}</div>
					<div className="year">({this.props.year})</div>
				</div>
				<div className="stars">{utf8.decode(this.props.stars)}</div>
			</Link>
			
		</li>
    );
  }
}
