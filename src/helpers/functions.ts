import { v4 as uuidv4 } from "uuid";

type Location = {
  id: string;
  locationId: number;
  name: string;
  latitude: number;
  longitude: number;
};

const locationCount = 1000;
const latitudeRange: [number, number] = [55.7, 58.0];
const longitudeRange: [number, number] = [20.5, 28.2];

export const generateLocationList = () => {
  const newLocationList: Location[] = [];
  for (let i = 1; i <= locationCount; i++) {
    const latitude = +(
      Math.random() * (latitudeRange[1] - latitudeRange[0]) +
      latitudeRange[0]
    ).toFixed(4);
    const longitude = +(
      Math.random() * (longitudeRange[1] - longitudeRange[0]) +
      longitudeRange[0]
    ).toFixed(4);
    const location = {
      id: uuidv4(),
      locationId: i,
      name: "Location " + i,
      latitude: latitude,
      longitude: longitude,
    };
    newLocationList.push(location);
  }
  return newLocationList;
};
