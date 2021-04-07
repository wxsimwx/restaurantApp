import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { View, Image, Text } from 'react-native';
import { Card } from 'native-base';

class Recommendation extends Component {
    constructor(props) {
        super(props)
    }

    get photo() {
        const photo = this.props.venue.photos.groups.length?this.props.venue.photos.groups[0].items[0]:{};
        return `${photo.prefix}300x500${photo.suffix}`;
    }

    godetails = e => {
        this.props.navigation.navigate('Details',{
            venue: this.props.venue,
        })
    };

    render() {
        const { venue, tips } = this.props;

        return (
            <MapView.Marker coordinate={{latitude: venue.location.lat,
                                         longitude: venue.location.lng}}>
                <MapView.Callout onPress={this.godetails}>
                    <Card>
                        <Image styleName="medium-wide"
                               source={{uri: this.photo}} />
                        <View styleName="content">
                            <Text>{venue.name}</Text>
                            <Text>{tips ? tips[0].text : ''}</Text>
                        </View>
                    </Card>
                </MapView.Callout>
            </MapView.Marker>
        )
    }
}

export default Recommendation;