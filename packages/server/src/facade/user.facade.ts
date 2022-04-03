import { Injectable } from "@nestjs/common";
import { join } from "path";
import { UserPhotoService } from "src/authentication/service/user/user.photo.service";
import { UserService } from "src/authentication/service/user/user.service";
import { CreateUserDTO, EditUserDTO, UserDTO, UserPhotoDTO } from "src/data/user.dto";
import { UserPrincipal } from "src/decorators/principal";
import { UserAttribute } from "src/model/user.model";
import { UserPhotoAttribute } from "src/model/user.photo.model";

@Injectable()
export class UserFacade {

    constructor(private readonly userService : UserService, private readonly userPhotoService : UserPhotoService){}

    public async createUser(user : CreateUserDTO) : Promise<UserAttribute> {
        return this.userService.createUser(user);
    }

    public async getUser(principal : UserPrincipal) : Promise<UserDTO> {
        const result = await this.userService.getUser(principal.id);
        return this.toUserDTO(result);
    }

    public async editUser(data : EditUserDTO, principal : UserPrincipal) : Promise<UserAttribute> {
        return this.userService.editUser(data, principal);
    }

    public async editPhoto(principal : UserPrincipal, file : Express.Multer.File) : Promise<UserPhotoDTO>{
        const user : UserPhotoAttribute = await this.userPhotoService.editPhoto(principal, file);
        return this.toUserPhoto(user);
    }

    private toUserDTO(user : UserAttribute) : UserDTO {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            userPhoto: this.toUserPhoto(user.userPhoto),
        }
    }

    private toUserPhoto(userPhoto : UserPhotoAttribute) : UserPhotoDTO {
        const ROOT = 'http://localhost:8080/';
        return {
            id: userPhoto.id,
            file: join(ROOT, userPhoto.folder, userPhoto.file),
        }
    }

}