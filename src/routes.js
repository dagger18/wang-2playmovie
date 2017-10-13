import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import MoviePage from './components/MoviePage';
import SearchPage from './components/SearchPage';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage}/>
    <Route name="movie" path="/movie/:id" component={MoviePage}/>
	<Route name="searchblank" path="/search" component={SearchPage}/>
    <Route name="search" path="/search/:id/" component={SearchPage}/>
   	<Route name="login" path="/login" component={LoginPage}/>
	<Route name="notfound" path="*" component={NotFoundPage} />
  </Route>
);

export default routes;
