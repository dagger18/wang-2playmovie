import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import SocialButton from './SocialButton';
import $ from 'jquery';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export default class LoginPage extends React.Component {
constructor(props) {
	super(props);
	this.state = {
    };
}
handleSocialLogin(user){
	console.log(user);
	var post_data = user._profile;
	post_data.accessToken = user._token.accessToken;
	post_data.expiresAt = user._token.expiresAt;
	post_data.provider = user._provider;
	post_data.providerId = user._profile.id;
	post_data.email = typeof(user._profile.email)!='undefined'?user._profile.email:'';
	$.ajax({
		url: 'http://113.161.98.44:3300/user/socialLogin/',
		dataType: 'json',
		method:'POST',
		data:post_data,
		success: function(response) {
			cookies.set('user',post_data);
			cookies.set('userId',response.id);
			cookies.set('accessToken', user._token.accessToken, { path: '/' });
			cookies.set('provider', user._provider, { path: '/' });
			cookies.set('providerId', user._profile.id, { path: '/' });
			cookies.set('profilePicURL', user._profile.profilePicURL, { path: '/' });
			cookies.set('firstName', user._profile.firstName, { path: '/' });
			cookies.set('lastName', user._profile.lastName, { path: '/' });
			cookies.set('fullname', user._profile.name, { path: '/' });
			browserHistory.push('/');
		}.bind(this),
		error: function(xhr, status, err) {
			console.error(this.props.url, status, err.toString());
		}.bind(this)
	});
}
handleSocialLoginFailure(err){
  console.error(err)
}
componentDidUpdate(prevProps,prepState){
	console.log('updated');
}
componentDidMount(){
	
}
render() {
	return (
		<div>
			<SocialButton className="facebook" provider='facebook' appId='1949897075334058' onLoginSuccess={this.handleSocialLogin} onLoginFailure={this.handleSocialLoginFailure}>
			  <i className="ts_icon ts_icon_facebook"></i>Login with Facebook
			</SocialButton>
			<SocialButton provider='google' appId='400206403980-ei6889t4bv1ruii7ei901uube2u92hnj.apps.googleusercontent.com' onLoginSuccess={this.handleSocialLogin} onLoginFailure={this.handleSocialLoginFailure}>
			  <i className="ts_icon ts_icon_google"></i>Login with Google
			</SocialButton>
			<SocialButton provider='instagram' autoLogin={false} redirect='http://quang.ga' appId='1e8d072c3a0b49089bcc71ddc8127361' onLoginSuccess={this.handleSocialLogin} onLoginFailure={this.handleSocialLoginFailure}>
			  <i className="ts_icon ts_icon_instagram"></i>Login with Instagram
			</SocialButton>
			<SocialButton provider='linkedin' appId='78k2hucs638ty5' onLoginSuccess={this.handleSocialLogin} onLoginFailure={this.handleSocialLoginFailure}>
			  <i className="ts_icon ts_icon_linkedin"></i>Login with Google
			</SocialButton>
	  	</div>
    );
  }
}
