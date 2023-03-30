import express from "express";
import { Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";
import { db } from "./db";
import { generateLocationList } from "./helpers/functions";
import { Location } from "./helpers/types";

let locationList: Location[] = [];

const app = express();

app.use(express.json());
app.use(bodyparser.json());
app.use(cors({ origin: "*" }));

app.listen(3004, () => {
  console.log("Application started on port 3004!");
});

app.get("/locations/generate", (req: Request, res: Response) => {
  db.query("DELETE FROM geolocations", function (err, data) {
    if (err) throw err;
  });
  locationList = generateLocationList();
  let locations = [];
  locationList.map((location) => {
    locations = [
      ...locations,
      [
        location.id,
        location.locationId,
        location.name,
        location.latitude,
        location.longitude,
      ],
    ];
  });
  db.query("INSERT INTO geolocations VALUES?;", [locations], (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

app.get("/locations", (req: Request, res: Response) => {
  db.query(
    "SELECT * FROM geolocations ORDER BY `locationId` asc",
    function (err, data) {
      if (err) throw err;
      res.send(data);
    }
  );
});

app.delete("/locations/delete/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  db.query("DELETE FROM geolocations WHERE id = ?;", id, function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});

app.post("/locations/new", (req: Request, res: Response) => {
  const location = [
    req.body.id,
    req.body.locationId,
    req.body.name,
    req.body.latitude,
    req.body.longitude,
  ];
  db.query(
    "INSERT INTO geolocations VALUES (?);",
    [location],
    function (err, data) {
      if (err) throw err;
      res.send(data);
    }
  );
});
