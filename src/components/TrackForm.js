import React, { useContext } from 'react';
import { Button, Input } from 'react-native-elements';
import { Context as LocationContext } from '../context/LocationContext';
import Spacer from './Spacer';
import useSaveTrack from '../hooks/useSaveTrack';

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
  } = useContext(LocationContext),
  [saveTrack] = useSaveTrack();

  return (
    <>
      <Spacer>
        <Input value={name} onChangeText={changeName} placeholder="Enter name" />
      </Spacer>
      <Spacer>
        {recording
          ? <Button title="Stop" onPress={stopRecording} />
          : <Button title="Start Recording" onPress={startRecording} />
        }
      </Spacer>
      {!recording && locations.length
        ? <Spacer><Button title="Save Recording" onPress={saveTrack} /></Spacer>
        : null
      }
    </>
  );
};

export default TrackForm;