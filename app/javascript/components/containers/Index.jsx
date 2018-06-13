import React from 'react';
import { connect } from 'react-redux';

class Index extends React.Component {

    render() {
        return (
            <div>
                Hello World!
            </div>
        );
    }
}

export default connect()(Index);
