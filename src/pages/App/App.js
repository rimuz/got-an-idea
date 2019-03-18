import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { withCookies } from 'react-cookie';
import { withRouter } from 'react-router';

import Start from '../Start/Start';
import Browse from '../Browse/Browse';
import User from '../User/User';
import Verify from '../User/Verify/Verify';
import Register from '../User/Register/Register'
import New from '../New/New';
import PageNotFound from '../404/PageNotFound';
import Dummy from '../Dummy/Dummy';

import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';
import Comp from '../../components/Comp/Comp';
import Modals from '../../components/Modals/Modals';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

import { connect } from 'react-redux';
import { checkAndFetch } from '../../redux/actions';

class App extends Component {
  constructor(props) {
    super(props);
    
    const { cookies, check } = props;
    const jwt = cookies.get('jwt');

    if(jwt)
      check(jwt, () => {
        cookies.remove('jwt');
      });
  }

  render() {
    return (
      <Comp>
        <Helmet>
          <title>
            Got an idea? - The online place for sharing my billion dollar idea.
          </title>

          <meta name="description" content={`
            Tell the internet all of your crazy ideas! Whether they are
            a book, a website or a business idea, tons of people
            out there are desperately looking for them.
            Login and get inspired on got-an-idea.com!
          `} />
        </Helmet>

        <ScrollToTop />
        <Modals />
        
        <Switch>
          <Route path='/(index.html)?' exact component={Start} />

          <Route path='/browse(.html)?' component={Browse} />
          <Route path='/search(.html)?' component={Dummy} />
          <Route path='/list(.html)?' component={Dummy} />

          {/* User */}
          <Route path='/user/sign-up(.html)?' exact component={Register} />
          <Route path='/user/verify/:token' component={Verify} />
          <Route path='/user(.html)?' component={User} />

          {/* Post */}
          <Route path='/post(.html)?' exact component={New} />
          <Route path='/post/:urlStage' component={New} />

          {/* 404 Page */}
          <Route path='/' component={PageNotFound} />
        </Switch>
      </Comp>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  check: (token, failed) => dispatch(checkAndFetch(token, failed)),
});

export default withRouter(connect(null, mapDispatchToProps)(withCookies(App)));
