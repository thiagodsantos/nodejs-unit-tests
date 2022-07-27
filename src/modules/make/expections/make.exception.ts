import { BadRequestError } from "routing-controllers";

export class MakeException extends BadRequestError {
  static alreadyExists() {
    return new MakeException('Make already exists!');
  }
}