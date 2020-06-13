import { Request, Response } from "express";
import { getRepository, Equal } from "typeorm";
import { validate } from "class-validator";
import { ListsFamily } from "../entity/ListsFamily";
import { WordFamily } from "../entity/WordFamily";
import { User } from "../entity/User";

class ListFamilyController {
  userRepository = getRepository(ListsFamily);

  static listAll = async (req: Request, res: Response) => {
    //Get users from database
    const u = res.locals.jwtPayload;
    const listsFamilyRepository = getRepository(ListsFamily);
    const listsFamily = await listsFamilyRepository.find({
      relations: ["wordFamily"],
      where: {
        user: {
          id: u.userId,
        },
      },
    });
    //Send the users object
    res.send(listsFamily);
  };

  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: string = req.params.id;
    //Get the user from database
    const listsFamilyRepository = getRepository(ListsFamily);
    try {
      const category = await listsFamilyRepository.findOneOrFail(id, {
        select: ["id"], //We dont want to send the password on response
      });
      res.send(category);
    } catch (error) {
      res.status(404).send("list not found");
    }
  };

  static allCategory = async (req: Request, res: Response) => {
    const ListsFamilyRepository = getRepository(ListsFamily);

    const u = res.locals.jwtPayload;
    const listsAll = await ListsFamilyRepository.find({
      where: {
        user: {
          id: u.userId,
        },
      },
    });
    res.send(listsAll);
  };

  static newCategory = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { name, listFamilyId, title } = req.body;
    let listsFamilyExsiting;
    const ListsFamilyRepository = getRepository(ListsFamily);

    if (listFamilyId) {
      listsFamilyExsiting = await ListsFamilyRepository.findOneOrFail(
        { id: listFamilyId },
        {
          select: ["id"], //We dont want to send the password on response
        }
      );
    }
    if (title) {
      listsFamilyExsiting = await ListsFamilyRepository.find({
        where: { title },
      });
    }

    let list = listFamilyId
      ? listsFamilyExsiting
      : listsFamilyExsiting && listsFamilyExsiting.length != 0
      ? listsFamilyExsiting
      : new ListsFamily();
    list.title = title;

    // userId
    const id = res.locals.jwtPayload.userId;
    const userRepository = getRepository(User);
    try {
      const u = await userRepository.findOneOrFail(id, {
        select: ["id"],
      });
      list.user = u;
    } catch (error) {
      res.status(404).send("Category not found");
    }

    //Validade if the parameters are ok
    const errors = await validate(list);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to save. If fails, the username is already in use
    const listFamilyRepository = getRepository(ListsFamily);
    let listSave;
    try {
      listSave = await listFamilyRepository.save(list);
    } catch (e) {
      res.status(409).send("list family already in use");
      return;
    }

    const wordFamilyRepository = getRepository(WordFamily);
    const listWord = new WordFamily();
    listWord.name = name;

    listWord.listsFamily = listSave;
    try {
      await wordFamilyRepository.save(listWord);
    } catch (e) {
      console.log(" list family=> " + e);
      res.status(409).send("list family already in use");
      return;
    }
    //If all ok, send 201 response
    res.status(201).send("created");
  };

  // static deleteUser = async (req: Request, res: Response) => {
  //   //Get the ID from the url
  //   const id = req.params.id;

  //   const userRepository = getRepository(User);
  //   let user: User;
  //   try {
  //     user = await userRepository.findOneOrFail(id);
  //   } catch (error) {
  //     res.status(404).send("User not found");
  //     return;
  //   }
  //   userRepository.delete(id);

  //   //After all send a 204 (no content, but accepted) response
  //   res.status(204).send();
  // };
}

export default ListFamilyController;
