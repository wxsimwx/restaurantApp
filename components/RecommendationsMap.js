
import React from 'react';
import MapView from 'react-native-maps'
import styles from './styles';
import Recommendation from './Recommendation';

const RecommendationsMap = ({ mapRegion, gpsAccuracy, recommendations, navigation }) => (
    <MapView region={mapRegion} style={styles.fullscreen}>
        <MapView.Circle center={mapRegion}
                        radius={gpsAccuracy*1.5}
                        strokeWidth={0.5}
                        strokeColor="rgba(66, 180, 230, 1)"
                        fillColor="rgba(66, 180, 230, 0.2)"
                        />

        <MapView.Circle center={mapRegion}
                        radius={5}
                        strokeWidth={0.5}
                        strokeColor="rgba(66, 180, 230, 1)"
                        fillColor="rgba(66, 180, 230, 1)"
                        />
                        
        {recommendations.map(r => <Recommendation navigation={navigation} {...r} key={r.venue.id} />)}
    </MapView>
);

export default RecommendationsMap;
