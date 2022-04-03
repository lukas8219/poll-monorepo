import { ShouldBeEmail, ShouldContainText } from "src/validation/validationDelegate";

export class CreateUserDTO {
  @ShouldContainText("user.create.name.notEmpty")
  name: string;
  @ShouldContainText("user.create.email.notEmpty")
  @ShouldBeEmail("user.create.email.invalid")
  email: string;
  @ShouldContainText("user.create.password.notEmpty")
  password: string;
}

export class EditUserDTO {

  @ShouldContainText("user.create.name.notEmpty")
  name: string;
  @ShouldContainText("user.create.email.notEmpty")
  @ShouldBeEmail("user.create.email.invalid")
  email: string;

}

export interface UserPhotoDTO {
  file: string,
  id : number,
}

export interface UserDTO {
  id : number,
  name : string,
  email: string,
  userPhoto?: UserPhotoDTO,
}