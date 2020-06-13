import { Request, Response } from "express";
import { getRepository, Equal } from "typeorm";
import { validate } from "class-validator";
import { Category } from "../entity/Category";
import { ListWord } from "../entity/ListWord";
import { User } from "../entity/User";

class CategoryController {
  userRepository = getRepository(Category);

  static listAll = async (req: Request, res: Response) => {
    //Get users from database
    const u = res.locals.jwtPayload;
    const categoryRepository = getRepository(Category);
    const categories = await categoryRepository.find({
      relations: ["listWords"],
      where: {
        user: {
          id: u.userId,
        },
      },
    });
    console.log({ categories });
    //Send the users object
    res.send(categories);
  };

  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: string = req.params.id;
    //Get the user from database
    const CategoryRepository = getRepository(Category);
    try {
      const category = await CategoryRepository.findOneOrFail(id, {
        select: ["id"], //We dont want to send the password on response
      });
      res.send(category);
    } catch (error) {
      res.status(404).send("User not found");
    }
  };

  static allCategory = async (req: Request, res: Response) => {
    const CategoryRepository = getRepository(Category);

    const u = res.locals.jwtPayload;
    const listsAll = await CategoryRepository.find({
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
    let { name, categoryId, word_one, word_two } = req.body;
    let categoryExsiting;
    const CategoryRepository = getRepository(Category);

    if (categoryId) {
      categoryExsiting = await CategoryRepository.findOneOrFail(
        { id: categoryId },
        {
          select: ["id"], //We dont want to send the password on response
        }
      );
    }

    if (name) {
      categoryExsiting = await CategoryRepository.find({ where: { name } });
    }

    let category = categoryId
      ? categoryExsiting
      : categoryExsiting.length != 0
      ? categoryExsiting
      : new Category();
    category.name = name;

    // userId
    const id = res.locals.jwtPayload.userId;
    const userRepository = getRepository(User);
    try {
      console.log("User");
      const u = await userRepository.findOneOrFail(id, {
        select: ["id"],
      });
      category.user = u;
    } catch (error) {
      res.status(404).send("Category not found");
    }

    //Validade if the parameters are ok
    const errors = await validate(category);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to save. If fails, the username is already in use
    const categoryRepository = getRepository(Category);
    let catSave;
    try {
      catSave = await categoryRepository.save(category);
    } catch (e) {
      res.status(409).send("category already in use");
      return;
    }
    const listWordRepository = getRepository(ListWord);
    const listWord = new ListWord();
    listWord.word_one = word_one;
    listWord.word_two = word_two;
    listWord.category = catSave;
    try {
      await listWordRepository.save(listWord);
    } catch (e) {
      console.log(" listword => " + e);
      res.status(409).send("listword already in use");
      return;
    }

    //If all ok, send 201 response
    res.status(201).send("created");
  };
  static deleteUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }
    userRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
}

export default CategoryController;
