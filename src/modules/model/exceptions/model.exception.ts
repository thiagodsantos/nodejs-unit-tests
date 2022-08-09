import { BadRequestError } from "routing-controllers";

export class ModelException  extends BadRequestError {
  static alreadyExists() {
    return new ModelException('Model already exists!');
  }
  
  static notExists() {
    return new ModelException('Model not exists!');
  }
}