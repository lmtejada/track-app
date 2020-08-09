import '../_mockLocation';
import React, { useContext } from 'react';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import { StyleSheet } from 'react-native';

import { Context as LocationContext } from '../context/LocationContext';
import Map from '../components/Map';
import TrackForm from '../components/TrackForm';
import useLocation from '../hooks/useLocation';

const TrackCreateScreen = ({ isFocused }) => {
  const { state, addLocation } = useContext(LocationContext),
    [err] = useLocation(isFocused, (location) => {
      addLocation(location, state.recording);
    });

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text h2>Create a Track</Text>
      <Map />
      { err ? <Text>Please enable location services</Text> : null }
      <TrackForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);