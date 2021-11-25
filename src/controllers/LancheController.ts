import { Request, Response } from 'express';

import Lanche from '../models/Lanche';

import * as dotenv from 'dotenv';

dotenv.config();

class LancheControllers {
  async create(request: Request, response: Response) {
    const { name, description, price, id } = request.body;

    const newLanche = {
      name: name,
      description: description,
      price: price,
      idHamburgueria: id,
    };

    try {
      await new Lanche(newLanche).save();
      return response.status(201).json(Lanche);
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Failed to create a new Lanche', error: error });
    }
  }

  async getLanchePorId(request: Request, response: Response) {
    const { id } = request.params;

    let data: Array<Object> = [];

    data = await Lanche.find({ idHamburgueria: id });

    response.status(200).json(data);
  }
}

export { LancheControllers };
