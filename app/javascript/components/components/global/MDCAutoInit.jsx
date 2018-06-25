import React from 'react';

import { autoInit } from '../../../helpers';

class MDCAutoInit extends React.Component {

    componentDidMount() {
        autoInit();
    }

    componentDidUpdate() {
        autoInit();
    }

    render() {
        autoInit();
        
        return null;
    }
}

export default MDCAutoInit;
