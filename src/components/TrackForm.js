import React, { useContext } from 'react';
import { Button, Input } from 'react-native-elements';
import { Context as LocationContext } from '../context/LocationContext';
import Spacer from './Spacer';

const TrackForm = () => {
  const { 
    state: {
      locations,
      name,
      recording
    },
    changeName,
    startRecording,
    stopRecording
  } = useContext(LocationContext);

  console.log(locations.length);

  return (
    <>
      <Spacer>
        <Input value={name} onChangeText={changeName} placeholder="Enter name" />
      </Spacer>
      {recording
        ? <Button title="Stop" onPress={stopRecording} />
        : <Button title="Start Recording" onPress={startRecording} />
      }
    </>
  );
};

export default TrackForm;