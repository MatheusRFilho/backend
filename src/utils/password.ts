import { compareSync, genSaltSync, hashSync } from 'bcrypt';

const saltRounds = 10;

export const hashToPassword = (password: string) => {
  const salt = genSaltSync(saltRounds);
  return hashSync(password, salt);
};

export const comparePassword = (password: string, hash: string) => {
  const isValid = compareSync(password, hash);

  return isValid;
};
