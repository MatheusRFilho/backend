import { Request, Response } from 'express';

import User from '../models/User';
import { comparePassword, hashToPassword } from '../utils/password';

import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validadePassword(password) {
  const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
  return re.test(String(password));
}

class UserControllers {
  async create(request: Request, response: Response) {
    const { name, email, password, admin } = request.body;

    if (!name) {
      return response.status(400).json({ message: 'Name is Required' });
    }

    if (!email) {
      return response.status(400).json({ message: 'Email is Required' });
    }
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      return response.status(400).json({ message: 'Email is not valid' });
    }

    const alreadyExists = await User.find({ email: email });

    if (alreadyExists.length > 0) {
      return response.status(400).json({ message: 'Email already exists' });
    }

    if (!password) {
      return response.status(400).json({ message: 'Password is Required' });
    }

    const isValidPassword = validadePassword(password);
    if (!isValidPassword) {
      return response.status(400).json({
        message:
          'The password has to contain Minimum eight characters, at least one uppercase letter, one lowercase letter and one number',
      });
    }

    const passwordCrypto = hashToPassword(password);

    const newUser = {
      email: email,
      name: name,
      password: passwordCrypto,
      isAdmin: admin ? admin : false,
    };

    try {
      await new User(newUser).save();
      return response.status(201).json(newUser);
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Failed to create a new user', error: error });
    }
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await User.findOne({ email: email });

    if (user) {
      const isCorrectPassword = comparePassword(password, user.password);

      if (isCorrectPassword) {
        const id = user._id;
        const token = jwt.sign({ id }, process.env.SECRET);

        return response.json({
          name: user.name,
          id: user._id,
          token: token,
          admin: user.isAdmin,
        });
      } else {
        return response.status(401).json({ message: 'Password incorrect' });
      }
    } else {
      return response.status(401).json({ message: 'Email not registered' });
    }
  }

  async getHamburguerias(request: Request, response: Response) {
    let data: Array<Object> = [];

    data = await User.find({ isAdmin: true });

    response.status(200).json(data);
  }
}

export { UserControllers };
