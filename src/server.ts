import express from "express";
import { Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

type Location = {
  id: string;
  locationId: number;
  name: string;
  latitude: number;
  longitude: number;
};

const locationCount = 1000;
let locationList: Location[] = [];

const latitudeRange: [number, number] = [55.7, 58.0];
const longitudeRange: [number, number] = [20.5, 28.2];

const app = express();

app.use(express.json());
app.use(bodyparser.json());
app.use(cors({ origin: "*" }));

app.listen(3004, () => {
  console.log("Application started on port 3004!");
});

const generateLocationList = () => {
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

app.get("/locations/generate", (req: Request, res: Response) => {
  locationList = generateLocationList();
  res.send(locationList);
});

app.get("/locations", (req: Request, res: Response) => {
  res.send(locationList);
});

app.delete("/locations/delete/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  locationList = locationList.filter((location) => {
    return location.id !== id;
  });
  res.send(locationList);
});
app.post("/locations/new", (req: Request, res: Response) => {
  const location = {
    id: req.body.id,
    locationId: req.body.locationId,
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  };
  locationList = [...locationList, location];
  res.send(locationList);
});
