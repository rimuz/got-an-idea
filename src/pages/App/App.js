import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import rootReducer from '../../redux/reducers';

import Start from '../Start/Start';
import Browse from '../Browse/Browse';
import User from '../User/User';
import Register from '../User/Register/Register'
import New from '../New/New';
import PageNotFound from '../404/PageNotFound';
import Dummy from '../Dummy/Dummy';

import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';
import Comp from '../../components/Comp/Comp';
import Modals from '../../components/Modals/Modals';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

const store = createStore(rootReducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Comp>
            <ScrollToTop />
            <Modals />
            
            <Switch>
              <Route path='/(index.html)?' exact component={Start} />

              <Route path='/browse(.html)?' component={Browse} />
              <Route path='/search(.html)?' component={Dummy} />
              <Route path='/list(.html)?' component={Dummy} />

              {/* User */}
              <Route path='/user/sign-up(.html)?' exact component={Register} />
              <Route path='/user(.html)?' component={User} />

              {/* Post */}
              <Route path='/post(.html)?' exact component={New} />
              <Route path='/post/:urlStage' component={New} />

              {/* 404 Page */}
              <Route path='/' component={PageNotFound} />
            </Switch>
          </Comp>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
