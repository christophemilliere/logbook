import { Request, Response } from "express";
import { getRepository, Equal } from "typeorm";
import { validate } from "class-validator";
import { Video } from "../entity/Video";
import { User } from "../entity/User";

class CategoryController {
  userRepository = getRepository(Video);

  static listAll = async (req: Request, res: Response) => {
    //Get users from database
    const videoRepository = getRepository(Video);
    const id = res.locals.jwtPayload.userId;
    const videos = await videoRepository.find({
      where: {
        user: {
          id
        }
      }
    });
    //Send the users object
    res.send(videos);
  };

  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: string = req.params.id;
    //Get the user from database
    const videoRepository = getRepository(Video);
    try {
      const category = await videoRepository.findOneOrFail(id);
      res.send(category);
    } catch (error) {
      res.status(404).send("User not found");
    }
  };

  static newVideo = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { title, url, youtube, vimeo } = req.body;
    const videoRepository = getRepository(Video);
    let video = new Video();
    // userId
    const id = res.locals.jwtPayload.userId;
    const userRepository = getRepository(User);
    try {
      console.log("User");
      const u = await userRepository.findOneOrFail(id, {
        select: ["id"]
      });
      video.user = u;
    } catch (error) {
      res.status(404).send("User not found");
    }
    video.title = title;
    video.url = url;
    video.youtube = youtube;
    video.vimeo = vimeo;

    //Validade if the parameters are ok
    const errors = await validate(video);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    try {
      videoRepository.save(video);
    } catch (error) {
      res.status(404).send("Video déja crée");
    }

    //If all ok, send 201 response
    res.status(201).send("created");
  };

  static editVideo = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    let { title, url, youtube, vimeo } = req.body;

    //Try to find user on database
    const videoRepository = getRepository(Video);
    let video;
    try {
      video = await videoRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("User not found");
      return;
    }

    //Validate the new values on model
    video.title = title;
    video.url = url;
    video.youtube = youtube;
    video.vimeo = vimeo;

    const errors = await validate(video);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await videoRepository.save(video);
      res.status(204).send("Update User");
      return;
    } catch (e) {
      res.status(409).send("video already in use");
      return;
    }
  };

  static deleteVideo = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const VideoRepository = getRepository(Video);
    let video: Video;
    try {
      video = await VideoRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }
    VideoRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
}

export default CategoryController;
