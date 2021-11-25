import { Request, Response } from 'express';

import Cart from '../models/Cart';

import * as dotenv from 'dotenv';

dotenv.config();

class CartControllers {
  async getCartByUser(request: Request, response: Response) {
    const { id } = request.params;

    let data: Array<Object> = [];

    data = await Cart.find({ idUser: id });

    response.status(200).json(data);
  }

  async getCartByHamburgueria(request: Request, response: Response) {
    const { id } = request.params;

    let data: Array<Object> = [];

    data = await Cart.find({ idHamburgueria: id });

    response.status(200).json(data);
  }
}

export { CartControllers };
