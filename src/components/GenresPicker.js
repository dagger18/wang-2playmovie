import React from 'react';
import { Link } from 'react-router';
export default class GenresPicker extends React.Component {
constructor(props) {
	super(props);
	this.getIndex = this.getIndex.bind(this);
}
getIndex(value, arr) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i] === value) {
            return i;
        }
    }
    return -1; //to handle the case where the value doesn't exist
}
componentDidMount(){
	
}
render() {
	return (
		<ul className="genres">
			{this.props.genres.map((genre)=>{
				return <li className={ (this.props.pickedGenres && this.getIndex(genre,this.props.pickedGenres))!=-1?'picked':'' } onClick={() => this.props.onClickGenre(genre)}>{genre}</li>;
			})}
		</ul>
    );
}
}
