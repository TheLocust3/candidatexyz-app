import React from 'react';
import PropTypes from 'prop-types';

export default class Loader extends React.Component {

    renderLoader() {
        if (this.props.isReady) return;

        return (
            <div className='sk-circle'>
                <div className='sk-circle1 sk-child' />
                <div className='sk-circle2 sk-child' />
                <div className='sk-circle3 sk-child' />
                <div className='sk-circle4 sk-child' />
                <div className='sk-circle5 sk-child' />
                <div className='sk-circle6 sk-child' />
                <div className='sk-circle7 sk-child' />
                <div className='sk-circle8 sk-child' />
                <div className='sk-circle9 sk-child' />
                <div className='sk-circle10 sk-child' />
                <div className='sk-circle11 sk-child' />
                <div className='sk-circle12 sk-child' />
            </div>
        );
    }

    renderChildren() {
        if (!this.props.isReady) return;

        return this.props.children;
    }

    render() {
        let { isReady, children, ...props } = this.props;

        return (
            <div {...props}>
                {this.renderLoader()}
                {this.renderChildren()}
            </div>
        );
    }
}

Loader.propTypes = {
    isReady: PropTypes.bool,
    children: PropTypes.any.isRequired
};
