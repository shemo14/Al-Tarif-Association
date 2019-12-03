import React, { Component } from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {Container, Content} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {chooseLang, profile, userLogin} from "../actions";

import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

class OpenCamera extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageBrowserOpen        : false,
            cameraBrowserOpenPE     : false,
            Base64                  : [],
            images                  : [],
            base_64                 : [],
            photos                  : [],
            hasCameraPermission     : null,

        }

    }

    async componentWillMount() {

        this.setState({cameraBrowserOpenPE: true});
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });

    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {

        await Permissions.askAsync(Permissions.CAMERA);
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }

    };

    snap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({
                base64 : true
            });
            // console.log('photo =====', photo);

            this.props.navigation.navigate('FormPayment', {photo : photo});
        }

    };

    render() {


        return (

            <Container>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>


                    {
                        (this.state.hasCameraPermission && this.state.cameraBrowserOpenPE === true) ?
                            <View style={[styles.Width_100, styles.bgFullWidth]}>
                                <Camera style={[styles.Width_100, styles.bgFullWidth, { height : 900}]} type={this.state.type} ref={ref => {this.camera = ref;}}>

                                </Camera>
                            </View>
                            :
                            <View/>
                    }

                </Content>

                <View style={[styles.overHidden, styles.rowGroup]}>
                    <TouchableOpacity style={[styles.clickLogin, styles.bg_darkGreen,styles.RadiusTop_5]} onPress={() => this.snap()}>
                        <Text style={[styles.textRegular, styles.textSize_18, styles.text_White,styles.paddingVertical_5, styles.textCenter]}>{i18n.translate('payoff')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.clickLogin, styles.bg_darkGreen,styles.RadiusTop_5]} onPress={() => this.snap()}>
                        <Text style={[styles.textRegular, styles.textSize_18, styles.text_White,styles.paddingVertical_5, styles.textCenter]}>{i18n.translate('payoff')}</Text>
                    </TouchableOpacity>
                </View>

            </Container>

        );
    }
}

const mapStateToProps = ({ auth, profile, lang }) => {
    return {
        auth        : auth.user,
        user        : profile.user,
        lang        : lang.lang
    };
};
export default connect(mapStateToProps, { userLogin, profile, chooseLang })(OpenCamera);