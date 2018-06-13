import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navbar from '../components/skeleton/Navbar';
import Footer from '../components/skeleton/Footer';

class Skeleton extends React.Component {

    render() {
        return (
            <div>
                <Navbar>
                    {this.props.children}
                </Navbar>

                <Footer />
            </div>
        );
    }
}

Skeleton.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.string
    ]).isRequired
};

export default connect()(Skeleton);
