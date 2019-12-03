import React, { Component } from "react";
import { AsyncStorage } from 'react-native';
import {connect} from "react-redux";
import {chooseLang, profile, userLogin} from "../actions";


class InitScreen extends Component {
    constructor(props) {
        super(props);
    }

    async componentWillMount() {

        console.log('auth..', this.props.auth , 'user profile ..', this.props.user);

        if (this.props.lang == null)
            this.props.navigation.navigate('Language');
        else if (this.props.auth == null || this.props.user == null)
            this.props.navigation.navigate('ChooseUser');
        else
            this.props.navigation.navigate('Home');

        AsyncStorage.getItem('init').then(init => {
            if (init !== 'true'){
                AsyncStorage.setItem('init', 'true');
                this.props.chooseLang('ar');
            }
        });

        console.log('lang ===', this.props.lang);

    }

    render() {
        return false;
    }
}

const mapStateToProps = ({ auth, profile, lang }) => {
    return {
        auth: auth.user,
        user: profile.user,
        lang: lang.lang
    };
};
export default connect(mapStateToProps, {userLogin, profile, chooseLang})(InitScreen);