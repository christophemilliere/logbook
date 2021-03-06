import "reflect-metadata";
import * as bodyParser from "body-parser";
import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";
import userRoutes from "./user/route";
import AuthRoutes from "./auth/route";
import CategoryRoutes from "./category/route";
import ListFamilyRoutes from "./ListFamily/route";
import VideoRoutes from "./video/route";
import path from "path";

console.log({ __dirname });

createConnection().then(async (connection) => {
  const options = {
    explorer: true,
  };
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());
  app.use("/utilisateurs", userRoutes);
  // app.use("/activities", ActivityRoute);
  app.use("/authentification", AuthRoutes);
  // app.use("/recherche", SearchRoutes);
  // app.use("/email", EmailRoutes);
  app.use("/categories", CategoryRoutes);
  app.use("/lists", ListFamilyRoutes);
  // app.use("/bookmarks", BookmarksRoutes);
  app.use("/video", VideoRoutes);
  //expressOasGenerator.init(app, {});
  app.use("/static", express.static(__dirname + "/public"));

  app.get("/faq", function (req, res) {
    res.sendFile(path.join(__dirname + "/public/faq.html"));
  });

  app.get("/acceuil", function (req, res) {
    res.sendFile(path.join(__dirname + "/public/index.html"));
  });

  //app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.listen(5000, function () {
    console.log("Example app listening on port 5000!");
  });
});
