import React, { Component } from 'react';
import styles from './styles';
import RecommendationsMap from './RecommendationsMap';
import { View } from 'react-native';
import { ActivityIndicator } from "react-native";
import { restaurantFilter } from "../selectors";
import { connect } from 'react-redux'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location'

const latitudeDelta =  0.00922*1.5;
const longitudeDelta = 0.00421*1.5;

class LocationScreen extends Component {
    constructor(props) {
        super(props)
        const { restArr } = this.props.states
        const [resdata] = restArr || []
        const {recommendations} = resdata
        const { venue, gpsAccuracy } = ((this.props.navigation||{}).state||{}).params || {}
        this.state = {
            mapRegion: {
                latitude: venue && venue.location ? venue.location.lat : 0,
                longitude: venue && venue.location ? venue.location.lng : 0,
                latitudeDelta,
                longitudeDelta
            },
            gpsAccuracy,
            recommendations: venue ? [{venue}] : recommendations
          };
    }

    componentDidMount() {
        this.permLocation()
    } 

    permLocation = async() => {
        if(this.state.mapRegion.latitude) return
        let {status} = await Permissions.askAsync(Permissions.LOCATION)

        if(status !=='granted'){
            this.setState({
            errorPerm: 'Permission access location was denied'
            })
        }

        let location = await Location.getCurrentPositionAsync({})
        let region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta,
            longitudeDelta
        }
        
        this.setState({
            gpsAccuracy: location.coords.accuracy,
            mapRegion: region
        })
    }

    render() {
        if (this.state.mapRegion.latitude && this.state.mapRegion.longitude ) {
            return (
                <RecommendationsMap navigation={this.props.navigation}  {...this.state} />            
            );
        }else{
            return (
                <View style={styles.centered}>
                    <ActivityIndicator styleName="large" />
                </View>
            );
        }
    }
}

const mapStateToProps = state => {
    const states = {restArr: restaurantFilter(state, 'ALL')};
    return { states };
  };

export default connect(mapStateToProps)(LocationScreen)

