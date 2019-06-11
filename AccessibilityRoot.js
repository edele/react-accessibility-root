// @flow strict

import * as React from "react";
import cn from "classnames";
import s from "./AccessibilityRoot.m.less";

/*
This component disables outline on focus, until TAB button is pressed.

By default it works only for <input>, <button> and so on.

If you want your custom <div> to be focusable, you should
import customFocusableClass like this:

import { customFocusableClass } from '../../AccessibilityRoot';

*/

export const customFocusableClass = s.customFocusableClass;

type AccessibilityRootState = {| userIsTabbing: boolean |};

export default class AccessibilityRoot extends React.Component<{ children: React.Node }, AccessibilityRootState> {
  state = { userIsTabbing: false };

  componentDidMount() {
    window.addEventListener("keydown", this.handleFirstTab);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleFirstTab);
  }

  handleFirstTab = (e: KeyboardEvent) => {
    const ESC_KEY = 9;

    if (e.keyCode === ESC_KEY) {
      this.setState({ userIsTabbing: true });
      window.removeEventListener("keydown", this.handleFirstTab);
    }
  };

  render() {
    return <div className={cn(s.root, this.state.userIsTabbing && s.userIsTabbing)}>{this.props.children}</div>;
  }
}
