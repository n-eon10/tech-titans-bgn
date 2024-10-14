// findNearestEvents.js
import { getDistance } from 'geolib';

export function findNearestEvents(userLocation, events) {
  const nearbyEvents = events.map((event) => {
    const distance = getDistance(
      { latitude: userLocation[0], longitude: userLocation[1] },
      { latitude: event.position[1], longitude: event.position[0] }
    );
    return { ...event, distance };
  });

  nearbyEvents.sort((a, b) => a.distance - b.distance);
  return nearbyEvents.slice(0, 4);
}
