import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import MoviePage from './MoviePage';
import IndexPage from './IndexPage';
import SearchBox from './SearchBox';
import Cookies from 'universal-cookie';
import Modal from 'react-modal';
import SocialButton from './SocialButton';
const cookies = new Cookies();
export default class Layout extends React.Component {
constructor(props) {
    super(props)

    this.state = {	isLoginModalOpen: false
					
				 };
	this.logout = this.logout.bind(this);
	this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSocialLogin = this.handleSocialLogin.bind(this);
}
openModal(evt) {
	evt.preventDefault()
	evt.stopPropagation();
    this.setState({isLoginModalOpen: true});
}
closeModal() {
    this.setState({isLoginModalOpen: false});
}
logout(evt){
	evt.preventDefault()
	evt.stopPropagation();
	cookies.remove('user');
	cookies.remove('userId');
	cookies.remove('accessToken');
	cookies.remove('provider');
	cookies.remove('providerId');
	cookies.remove('profilePicURL');
	cookies.remove('firstName');
	cookies.remove('lastName');
	cookies.remove('fullname');
	this.forceUpdate();
	return false;
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
			this.state.isLoginModalOpen = false;
			this.forceUpdate();
		}.bind(this),
		error: function(xhr, status, err) {
			console.error(this.props.url, status, err.toString());
		}.bind(this)
	});
}
handleSocialLoginFailure(err){
  console.error(err)
}
renderChildren() {
    return React.Children.map(this.props.children, child => {
      	if (child.type !== IndexPage) {
        	return React.cloneElement(child, {
          				
        	})
		} else {
			return child
		}
    });
}


componentDidMount() {

	this.$node = $(this.refs.share);
	this.$node.jsSocials({
		showLabel: false,
		showCount: false,

		shares: [{
			renderer: function() {
				var $result = $("<div>");
				var script = document.createElement("script");
				script.text = "(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = \"//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3\"; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'facebook-jssdk'));";
				$result.append(script);
				$("<div>").addClass("fb-share-button").attr("data-layout", "button_count").appendTo($result);
				return $result;
			}
		}, {
			renderer: function() {
				var $result = $("<div>");
				var script = document.createElement("script");
				script.src = "https://apis.google.com/js/platform.js";
				$result.append(script);
				$("<div>").addClass("g-plus").attr({"data-action": "share","data-annotation": "bubble"}).appendTo($result);
				return $result;
			}
		}, {
			renderer: function() {
				var $result = $("<div>");
				var script = document.createElement("script");
				script.src = "//platform.linkedin.com/in.js";
				$result.append(script);
				$("<script>").attr({ type: "IN/Share", "data-counter": "right" }).appendTo($result);
				return $result;
			}
		}, {
			renderer: function() {
				var $result = $("<div>");
				var script = document.createElement("script");
				script.text = "window.twttr=(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],t=window.twttr||{};if(d.getElementById(id))return t;js=d.createElement(s);js.id=id;js.src=\"https://platform.twitter.com/widgets.js\";fjs.parentNode.insertBefore(js,fjs);t._e=[];t.ready=function(f){t._e.push(f);};return t;}(document,\"script\",\"twitter-wjs\"));";
				$result.append(script);
				$("<a>").addClass("twitter-share-button").text("Tweet").attr("href", "https://twitter.com/share").appendTo($result);
				return $result;
			}
		}, {
			renderer: function() {
				var $result = $("<div style=\"line-height:52px;\">");
				var script = document.createElement("script");
				script.src = "//assets.pinterest.com/js/pinit.js";
				$result.append(script);
				$("<a>").append($("<img>").attr("//assets.pinterest.com/images/pidgets/pinit_fg_en_rect_red_20.png"))
						.attr({
							href: "//www.pinterest.com/pin/create/button/?url=http%3A%2F%2Fjs-socials.com%2Fdemos%2F&media=%26quot%3Bhttp%3A%2F%2Fgdurl.com%2Fa653%26quot%3B&description=Next%20stop%3A%20Pinterest",
							"data-pin-do": "buttonPin","data-pin-config": "beside","data-pin-color":"red"
						}).appendTo($result);
				return $result;
			}
		}]
	});

}

render() {
	var genres=['Action','Adventure','Animation','Biography','Comedy','Crime','Documentary','Drama','Family','Fantasy','Film-Noir','Game-Show','History','Horror','Music','Musical','Mystery','News','Reality-TV','Romance','Sci-fi','Sport','Talk-Show','Thriller','War','Western'];
	var countries=['Argentina','Australia','Austria','Belgium','Brazil','Bulgaria','Canada','China','Colombia',
'Costa Rica','Czech Republic','Denmark','Finland','France','Germany','Greece','Hong Kong',
'Hungary','Iceland','India','Iran','Ireland','Italy','Japan','Malaysia','Mexico','Netherlands',
'New Zealand','Pakistan','Poland','Portugal','Romania','Russia','Singapore','South Africa','Spain',
'Sweden','Switzerland','Thailand','UK','USA'];
	var customStyles = {
		overlay : {
			position          : 'fixed',
			top               : 0,
			left              : 0,
			right             : 0,
			bottom            : 0,
			background   	  : 'transparent',
		  },
		  content : {
			top                   : '50%',
			left                  : '50%',
			right                 : 'auto',
			bottom                : 'auto',
			marginRight           : '-50%',
			transform             : 'translate(-50%, -50%)'
		  }
		};
	return (
 	<div id="main-wrapper" className= {this.props.location.pathname.indexOf('/movie/') !== -1?'watch':(this.props.location.pathname.indexOf('/search') !== -1 ?'search':'')}>
		<div className="header-and-menu">
			<div className="header">
				<div className="wrapper-container" style={{'position':'relative'}}>
					<div className="alt-logo"><Link to={`/`}><img src="/images/logo.png" />2play<span>Movie</span></Link></div>
					<SearchBox />
					<div className="site-menu">
						<ul>
							<li className="menu-dropdown-wrapper"><a>Genre</a>
								<ul className="menu-dropdown mega-menu">
									{genres.map((genre)=>{
										return <li><Link to={`/search?pickedGenres=${genre}`}>{genre}</Link></li>;
									})}
								</ul>
							</li>
							<li className="menu-dropdown-wrapper"><a>Country</a>
								<ul className="menu-dropdown mega-menu">
									{countries.map((country)=>{
										return <li><Link to={`/search?pickedCountry=${country}`}>{country}</Link></li>;
									})}
								</ul>
							</li>
							<li><Link to={`/search?sortie=newest`}>Newest</Link></li>
							<li><Link to={`/search?sortie=most`}>Most Watched</Link></li>
						</ul>
					</div>
					<div className="user-menu">
						{!cookies.get('user') && <Link to={`/login`} onClick={this.openModal}><i class="ts_icon ts_icon_sign_in"></i>Login</Link>}
						<div style={{'display':'none'}}>
							<SocialButton provider='facebook' appId='1949897075334058' onLoginSuccess={this.handleSocialLogin} onLoginFailure={this.handleSocialLoginFailure}>
							  <i className="ts_icon ts_icon_facebook"></i>Login with Facebook
							</SocialButton>
						  	<SocialButton provider='linkedin' appId='78k2hucs638ty5' onLoginSuccess={this.handleSocialLogin} onLoginFailure={this.handleSocialLoginFailure}>
							  <span className="linkedin-login"><i className="ts_icon ts_icon_linkedin"></i>Login with Linkedin</span>
							</SocialButton>
					  	</div>
						{!cookies.get('user') && (	<Modal isOpen={this.state.isLoginModalOpen} overlayClassName={{afterOpen:'loginModal_after'}} onRequestClose={this.closeModal} style={customStyles} contentLabel="Login">
														<h4>Login to your account</h4>
												  		<div>
															<SocialButton className="facebook" provider='facebook' appId='1949897075334058' onLoginSuccess={this.handleSocialLogin} onLoginFailure={this.handleSocialLoginFailure}>
															  <span className="facebook-login"><i className="ts_icon ts_icon_facebook"></i>Login with Facebook</span>
															</SocialButton>
															<SocialButton provider='google' appId='400206403980-ei6889t4bv1ruii7ei901uube2u92hnj.apps.googleusercontent.com' onLoginSuccess={this.handleSocialLogin} onLoginFailure={this.handleSocialLoginFailure}>
															  <span className="google-login"><i className="ts_icon ts_icon_google"></i>Login with Google</span>
															</SocialButton>
												  			<SocialButton provider='instagram' autoLogin={false} redirect='http://quang.ga' appId='1e8d072c3a0b49089bcc71ddc8127361' onLoginSuccess={this.handleSocialLogin} onLoginFailure={this.handleSocialLoginFailure}>
															  <span className="instagram-login"><i className="ts_icon ts_icon_instagram"></i>Login with Instagram</span>
															</SocialButton>
												  			<SocialButton provider='linkedin' appId='78k2hucs638ty5' onLoginSuccess={this.handleSocialLogin} onLoginFailure={this.handleSocialLoginFailure}>
															  <span className="linkedin-login"><i className="ts_icon ts_icon_linkedin"></i>Login with Linkedin</span>
															</SocialButton>
												  
														</div>
													</Modal>)}
						{cookies.get('user') && (<div>
													<span className="notifications"><i className="ts_icon ts_icon_bell"></i></span>
													<span className="firstName-wrapper">	
														<span className="firstName">
															<img src={cookies.get('profilePicURL')} />
															{cookies.get('firstName')}<i className="ts_icon ts_icon_caret_down"></i>
															<ul className="menu-dropdown">
																<li><Link to={`/user/dahsboard`}><i className="ts_icon ts_icon_dashboard"></i>Dashboard</Link></li>	
																<li><Link to={`/user/movies`}><i className="ts_icon ts_icon_star"></i>My Movies</Link></li>	
																<li><Link to={`/user/profile`}><i className="ts_icon ts_icon_pencil"></i>Edit Profile</Link></li>	
																<li><Link to={`/user/logout`} onClick={this.logout}><i className="ts_icon ts_icon_sign_out"></i>Logout</Link></li>	
															</ul>
														</span>
													</span>
												</div>)}
					</div>
				</div>
			</div>
			<div className="menu-and-search">
				<div className="wrapper-container">
					<div className="site-banner" ref="share"></div>
					<div className="site-banner-text">Like and share our website to support us.</div>
				</div>
			</div>
		</div>
		<div className="main-content">
			{this.renderChildren()}
		</div>
	</div>
      
    );
}
}
