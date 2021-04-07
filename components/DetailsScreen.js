import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import styles from './styles';

class DetailsScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            venue: this.props.navigation.state.params.venue
        }
    }
    get photo() {
        const photo = this.state.venue.photos.groups.length?this.state.venue.photos.groups[0].items[0]:{};
        return `${photo.prefix}300x500${photo.suffix}`;
    }

    render() {
        const location = this.state.venue.location || {}
        return (
            <View style={styles.centerTopPadding}>
                    <Image styleName="medium-wide"
                            source={{uri: this.photo}} />
                <Text>Name: {this.state.venue.name}</Text>
                <Text>Tips: {this.state.venue.tips ? this.state.venue.tips[0].text : '-'}</Text>
                <Text>Address: {Array.isArray(location.formattedAddress)?location.formattedAddress[0]:''}</Text>
            </View>
        );
    }
}

export default DetailsScreen

