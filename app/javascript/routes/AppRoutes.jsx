import _ from 'lodash';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserActions, setCampaignId } from 'candidatexyz-common-js';

import Skeleton from '../components/containers/Skeleton';
import NotFound from '../components/containers/NotFound';

import Index from '../components/containers/Index';
import Website from '../components/containers/Website';
import Settings from '../components/containers/Settings';
import SignIn from '../components/containers/users/SignInContainer';

import Campaign from '../components/containers/campaign/Campaign';
import Staff from '../components/containers/campaign/Staff';
import EditUser from '../components/containers/campaign/EditUser';
import InviteStaff from '../components/containers/campaign/InviteStaff';

import ShowCommittee from '../components/containers/campaign/committee/ShowCommittee';
import EditCommittee from '../components/containers/campaign/committee/EditCommittee';

import Finance from '../components/containers/finance/Finance';

import Reports from '../components/containers/finance/reports/Reports';
import ShowReport from '../components/containers/finance/reports/ShowReport';
import CreateReport from '../components/containers/finance/reports/CreateReport';

import Donations from '../components/containers/finance/donations/Donations';
import ShowDonation from '../components/containers/finance/donations/ShowDonation';
import CreateDonation from '../components/containers/finance/donations/CreateDonation';
import EditDonation from '../components/containers/finance/donations/EditDonation';

import Donors from '../components/containers/finance/donations/donors/Donors';
import ShowDonor from '../components/containers/finance/donations/donors/ShowDonor';

import Expenditures from '../components/containers/finance/expenditures/Expenditures';
import ShowExpenditure from '../components/containers/finance/expenditures/ShowExpenditure';
import CreateExpenditure from '../components/containers/finance/expenditures/CreateExpenditure';
import EditExpenditure from '../components/containers/finance/expenditures/EditExpenditure';

import InKinds from '../components/containers/finance/in-kinds/InKinds';
import ShowInKind from '../components/containers/finance/in-kinds/ShowInKind';
import CreateInKind from '../components/containers/finance/in-kinds/CreateInKind';
import EditInKind from '../components/containers/finance/in-kinds/EditInKind';

import Liabilities from '../components/containers/finance/liabilities/Liabilities';
import ShowLiability from '../components/containers/finance/liabilities/ShowLiability';
import CreateLiability from '../components/containers/finance/liabilities/CreateLiability';
import EditLiability from '../components/containers/finance/liabilities/EditLiability';

import ShowUser from '../components/containers/campaign/ShowUser';

import Communication from '../components/containers/communication/Communication';
import Volunteers from '../components/containers/communication/volunteers/Volunteers';
import SignUps from '../components/containers/communication/sign-ups/SignUps';
import Messages from '../components/containers/communication/messages/Messages';
import Mail from '../components/containers/communication/Mail';

import ShowSignUp from '../components/containers/communication/sign-ups/ShowSignUp';
import ShowMessage from '../components/containers/communication/messages/ShowMessage';
import ShowVolunteer from '../components/containers/communication/volunteers/ShowVolunteer';

import RespondMessage from '../components/containers/communication/messages/RespondMessage';

import EditSignUp from '../components/containers/communication/sign-ups/EditSignUp';
import EditVolunteer from '../components/containers/communication/volunteers/EditVolunteer';

class AppRoutes extends React.Component {

    componentWillMount() {
        this.props.dispatch(UserActions.fetchCurrentUser());
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isReady || _.isEmpty(nextProps.user)) return;
        
        setCampaignId(nextProps.user.campaignId);
    }

    render() {
        if (!this.props.isReady) return null;
        if (_.isEmpty(this.props.user)) return <SignIn />;

        return (
            <Skeleton>
                <Route>
                    <Switch>
                        <Route exact path='/' component={Index} />
                        <Route exact path='/website' component={Website} />
                        <Route exact path='/settings' component={Settings} />

                        <Route exact path='/communication' component={Communication} />
                        <Route exact path='/communication/mail/:group' component={Mail} />

                        <Route exact path='/communication/sign-ups' component={SignUps} />
                        <Route exact path='/communication/sign-ups/:id' component={ShowSignUp} />
                        <Route exact path='/communication/sign-ups/:id/edit' component={EditSignUp} />

                        <Route exact path='/communication/volunteers' component={Volunteers} />
                        <Route exact path='/communication/volunteers/:id' component={ShowVolunteer} />
                        <Route exact path='/communication/volunteers/:id/edit' component={EditVolunteer} />

                        <Route exact path='/communication/messages' component={Messages} />
                        <Route exact path='/communication/messages/:id' component={ShowMessage} />
                        <Route exact path='/communication/messages/:id/respond' component={RespondMessage} />

                        <Route exact path='/campaign' component={Campaign} />
                        <Route exact path='/campaign/staff' component={Staff} />
                        <Route exact path='/campaign/staff/:id' component={ShowUser} />
                        <Route exact path='/campaign/staff/:id/edit' component={EditUser} />
                        <Route exact path='/campaign/invite-staff' component={InviteStaff} />

                        <Route exact path='/campaign/committee' component={ShowCommittee} />
                        <Route exact path='/campaign/committee/edit' component={EditCommittee} />

                        <Route exact path='/finance' component={Finance} />

                        <Route exact path='/finance/reports' component={Reports} />
                        <Route exact path='/finance/reports/create' component={CreateReport} />
                        <Route exact path='/finance/reports/:id' component={ShowReport} />

                        <Route exact path='/finance/donations' component={Donations} />
                        <Route exact path='/finance/donations/create' component={CreateDonation} />
                        <Route exact path='/finance/donations/:id' component={ShowDonation} />
                        <Route exact path='/finance/donations/:id/edit' component={EditDonation} />

                        <Route exact path='/finance/donors' component={Donors} />
                        <Route exact path='/finance/donors/:id' component={ShowDonor} />

                        <Route exact path='/finance/expenditures' component={Expenditures} />
                        <Route exact path='/finance/expenditures/create' component={CreateExpenditure} />
                        <Route exact path='/finance/expenditures/:id' component={ShowExpenditure} />
                        <Route exact path='/finance/expenditures/:id/edit' component={EditExpenditure} />
                        
                        <Route exact path='/finance/in-kinds' component={InKinds} />
                        <Route exact path='/finance/in-kinds/create' component={CreateInKind} />
                        <Route exact path='/finance/in-kinds/:id' component={ShowInKind} />
                        <Route exact path='/finance/in-kinds/:id/edit' component={EditInKind} />

                        <Route exact path='/finance/liabilities' component={Liabilities} />
                        <Route exact path='/finance/liabilities/create' component={CreateLiability} />
                        <Route exact path='/finance/liabilities/:id' component={ShowLiability} />
                        <Route exact path='/finance/liabilities/:id/edit' component={EditLiability} />

                        <Route component={NotFound} />
                    </Switch>
                </Route>
            </Skeleton>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.users.isCurrentUserReady,
        user: state.users.currentUser
    };
}

export default connect(mapStateToProps)(AppRoutes);
