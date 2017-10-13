import React from 'react';
import { Link } from 'react-router';
import utf8 from 'utf8';
export default class CastPreview extends React.Component {
  render() {
    return (
		<li>
			<div className="cast-preview" >
				<div className="avatar">
					<img src={(this.props.picture==1)?("/img/cast-"+this.props.imdb_id+".jpg"):"/images/faceless.png"}/>
				</div>
				<div className="name">
					<Link to={`/actor/${this.props.id}`}>{utf8.decode(this.props.name)}</Link>
				</div>
				<div className="character">
					{utf8.decode(this.props.character_name)}
				</div>
				
			</div>
		</li>
    );
  }
}
