import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

import img_logo from './logo-gray.svg';
import img_post from './post.svg';
import img_search from './search.svg';
import img_browse from './browse.svg';
import img_list from './list.svg';
import img_user from './user.svg';

import styles from './NavBar.module.scss';

class NavBar extends Component {
  state = {
    isCollapsed: false
  };

  titleClickHandler = () => {
    this.props.history.push({
      pathname: '/'
    });
  };

  scrollHandler = (event) => {
    const scrollTop = event.srcElement.scrollingElement.scrollTop;
    const isCollapsed = scrollTop > 90;

    if(isCollapsed != this.state.isCollapsed)
      this.setState({ isCollapsed });
  };

  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener(this.scrollHandler.bind(this));
  }

  render(){
    return (
      <div className={styles.outer + ' ' + (this.state.isCollapsed ? styles.collapsed : '')}>
        <Link to='/' className={styles.logoAndTitle}>
          <img src={img_logo} className={styles.logo} alt='Logo'/>
          <h1>Got an idea?</h1>
        </Link>

        <span className={styles.icons}>
          <NavLink to='/browse' activeClassName={styles.selected} >
            <img key='browse' src={img_browse} alt='Browse' />
          </NavLink>

          <NavLink to='/search' activeClassName={styles.selected} >
            <img key='search' src={img_search} alt='Search' />
          </NavLink>

          <NavLink to="/list" activeClassName={styles.selected} >
            <img key='list' src={img_list} alt='Get Inspired' />
          </NavLink>

          <NavLink to='/post' activeClassName={styles.selected} >
            <img key='post' src={img_post} alt='Post' />
          </NavLink>

          <NavLink to='/user' activeClassName={styles.selected} >
            <img key='user' src={img_user} alt='User' />
          </NavLink>
        </span>
        <span></span>
      </div>
    );
  }
}

export default NavBar;
