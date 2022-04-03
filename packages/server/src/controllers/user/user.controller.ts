import { Body, Controller, Get, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express/multer/interceptors/file.interceptor";
import { SetPublic } from "src/authentication/guards/public.guard";
import { CreateUserDTO, EditUserDTO, UserDTO, UserPhotoDTO } from "src/data/user.dto";
import { Principal, UserPrincipal } from "src/decorators/principal";
import { UserFacade } from "src/facade/user.facade";
import { UserAttribute } from "src/model/user.model";

@Controller('/v1/user/')
export class UserController {

    constructor(private readonly userFacade : UserFacade){}

    @SetPublic()
    @Post()
    async createUser(@Body() data : CreateUserDTO) : Promise<UserAttribute> {
        return this.userFacade.createUser({
            email: data.email,
            name: data.name,
            password: data.password
        });
    }

    @Get()
    async getUser(@Principal() principal : UserPrincipal) : Promise<UserDTO> {
        return this.userFacade.getUser(principal);
    }

    @Put()
    async editUser(@Body() data: EditUserDTO, @Principal() req : UserPrincipal) : Promise<UserAttribute> {
        return this.userFacade.editUser({
            name: data.name,
            email: data.email
        },
        req);
    }

    @Post('photo')
    @UseInterceptors(FileInterceptor('file'))
    async editPhoto(@Principal() principal : UserPrincipal, @UploadedFile() file : Express.Multer.File) : Promise<UserPhotoDTO> {
        return this.userFacade.editPhoto(principal, file);
    }

}