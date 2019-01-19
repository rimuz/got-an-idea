import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

import { ReactComponent as Logo } from './assets/logo-gray.svg';
import { ReactComponent as Browse } from './assets/browse.svg';
import { ReactComponent as Post } from './assets/post.svg';
import { ReactComponent as User } from './assets/user.svg';
/*
  import { ReactComponent as Search } from './assets/search.svg';
  import { ReactComponent as List } from './assets/list.svg';
*/

import styles from "./NavBar.module.scss";
import throttle from "lodash/throttle";

class NavBar extends Component {
  state = {
    isCollapsed: false,
  }

  constructor(props) {
    super(props);
    this.scrollHandlerFunction = throttle(this.scrollHandler, 500);
  }

  titleClickHandler = () => {
    this.props.history.push('/');
  }

  scrollHandler = event => {
    const scrollTop = event.srcElement.scrollingElement.scrollTop;

    /*
      const isCollapsed = scrollTop > 200;

      if(isCollapsed !== this.state.isCollapsed)
        this.setState({ isCollapsed });
    */

    var isCollapsed = null;

    if (scrollTop > this.lastTop) {
      isCollapsed = true;
    } else if (scrollTop < this.lastTop) {
      isCollapsed = false;
    }

    if (isCollapsed !== null && isCollapsed !== this.state.isCollapsed)
      this.setState({ isCollapsed });
    this.lastTop = scrollTop;
  }

  componentDidMount() {
    this.lastTop = window.pageYOffset || document.documentElement.scrollTop;
    window.addEventListener("scroll", this.scrollHandlerFunction);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollHandlerFunction);
  }

  render() {
    return (
      <nav className={this.state.isCollapsed ? styles.collapsed : ""}>
        <Link to="/" className={styles.logoAndTitle}>
          <Logo className={styles.logo} />
          <h1>Got an idea?</h1>
        </Link>

        <span className={styles.icons}>
          <NavLink to="/browse" activeClassName={styles.selected}>
            <Browse />
          </NavLink>

          {/*
          <NavLink to="/search" activeClassName={styles.selected}>
            <Search />
          </NavLink>

          <NavLink to="/list" activeClassName={styles.selected}>
            <List />
          </NavLink>
          */}
          <NavLink to="/post" activeClassName={styles.selected}>
            <Post />
          </NavLink>
          
          <NavLink to="/user" activeClassName={styles.selected}>
            <User />
          </NavLink>
        </span>
        <span />
      </nav>
    )
  }
}

export default NavBar
