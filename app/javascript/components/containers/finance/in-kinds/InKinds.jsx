import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { InKindActions } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import Pager from '../../../components/common/Pager';
import Table from '../../../components/common/Table';

const PER_PAGE = 10;

class InKinds extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('In Kind Contributions'));
        this.props.dispatch(setBreadcrumb('In Kind Contributions'));
        this.props.dispatch(setDrawerSelected('finance', 'inKinds'));

        this.props.dispatch(InKindActions.fetchAllInKinds());
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>In Kind Contributions List</Text>
                <div className='resource-actions'>
                    <Link className='resource-actions-item unstyled-link-black' to='/finance/in-kinds/create'>
                        <Text type='body2'>Add</Text>
                    </Link>
                </div>
                <br />

                <div className='content-1'>
                    <Loader isReady={this.props.isReady}>
                        <Table to='/finance/in-kinds/' headers={['From Whom', 'Value', 'Date Received', 'Address']} keys={['fromWhom', 'valueString', (row) => { return moment(row.dateReceived).format('MM/DD/YYYY') }, (row) => { return `${row.address}, ${row.city}, ${row.state}, ${row.country}` }]} sortingKeys={['fromWhom', 'value', (row) => { return moment(row.dateReceived).format('MM/DD/YYYY') }, (row) => { return `${row.address}, ${row.city}, ${row.state}, ${row.country}` }]} rows={this.props.inKinds.inKinds} rowsPerPage={PER_PAGE} />
                        <br /><br />

                        <Pager elements={this.props.inKinds.inKinds} elementsPerPage={PER_PAGE} baseLink='/finance/in-kinds' />
                    </Loader>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.inKinds.isReady,
        inKinds: state.inKinds.inKinds
    };
}

export default connect(mapStateToProps)(InKinds);
