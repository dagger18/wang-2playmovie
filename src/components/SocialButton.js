import React from 'react'
import SocialLogin from 'react-social-login'
class Button extends React.Component{
render () {
	return(
		<button className={"provider-"+this.props.provider} onClick={this.props.triggerLogin} >
			{ this.props.children }
		  </button>
	)
}
}
export default SocialLogin(Button)