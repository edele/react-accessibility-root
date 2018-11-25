// @flow strict

import * as React from 'react';
import s from './AccessibilityRoot.m.less';
import cn from 'classnames';

type AccessibilityRootState = { userIsTabbing: boolean };

export default class AccessibilityRoot extends React.Component<{ children: React.Node }, AccessibilityRootState> {
    state = { userIsTabbing: false };

    componentDidMount() {
        window.addEventListener('keydown', this.handleFirstTab);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleFirstTab);
    }

    handleFirstTab = (e: KeyboardEvent) => {
        const ESC_KEY = 9;

        if (e.keyCode === ESC_KEY) {
            this.setState({ userIsTabbing: true });
            window.removeEventListener('keydown', this.handleFirstTab);
        }
    };

    render() {
        return <div className={cn(s.root, this.state.userIsTabbing && s.userIsTabbing)}>{this.props.children}</div>;
    }
}
