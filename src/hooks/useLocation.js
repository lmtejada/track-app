import { useEffect, useState } from 'react';
import { Accuracy, requestPermissionsAsync, watchPositionAsync } from 'expo-location';

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null),
    [subscriber, setSubscriber] = useState(null),
    startWatching = async () => {
      try {
        const { granted } = await requestPermissionsAsync();
        if (!granted) {
          throw new Error('Location permission not granted');
        }

        const sub = await watchPositionAsync({
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10
        }, callback);

        setSubscriber(sub);
      } catch (e) {
        setErr(e);
      }
    };

  useEffect(() => {
    if (shouldTrack) {
      startWatching();
    } else if (subscriber) {
      subscriber.remove();
      setSubscriber(null);
    }
  }, [shouldTrack]);

  return [err];
};