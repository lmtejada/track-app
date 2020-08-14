import React, { useContext } from 'react';
import { Context as TrackContext } from '../context/TrackContext';
import { StyleSheet, Text } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

const TrackDetailScreen = ({ navigation }) => {
  const _id = navigation.getParam('_id'),
    { state } = useContext(TrackContext),
    track = state.find(t => t._id === _id),
    initialCoords = track.locations[0].coords;

  return (
    <>
      <Text style={{ fontSize: 48 }}>{track.name}</Text>
      <MapView
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...initialCoords
        }}
        style={styles.map}
      >
        <Polyline
          coordinates={track.locations.map(loc => loc.coords)}
        />
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300
  }
});

export default TrackDetailScreen;