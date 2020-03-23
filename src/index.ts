import "reflect-metadata";
import * as bodyParser from "body-parser";
import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";
// import helmet from "helmet";
import userRoutes from "./user/route";
import AuthRoutes from "./auth/route";
import { checkJwt } from "./middlewares/checkJwt";
import CategoryRoutes from "./category/route";
import VideoRoutes from "./video/route";


createConnection().then(async connection => {
	const options = {
		explorer: true
	};
	const app = express();

	app.use(bodyParser.json());
	app.use(cors());
	// app.use(helmet());

	app.use("/utilisateurs", userRoutes);
	// app.use("/activities", ActivityRoute);
	app.use("/authentification", AuthRoutes);
	// app.use("/recherche", SearchRoutes);
	// app.use("/email", EmailRoutes);
	app.use("/categories", checkJwt, CategoryRoutes);
	// app.use("/bookmarks", BookmarksRoutes);
	app.use("/video", checkJwt, VideoRoutes);
	//expressOasGenerator.init(app, {});

	//app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

	app.listen(5000, function () {
		console.log("Example app listening on port 5000!");
	});
});
