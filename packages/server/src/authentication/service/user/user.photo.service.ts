import { Injectable, Logger, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { writeFileSync, createWriteStream } from "fs";
import { join } from "path";
import { UserRepository } from "src/authentication/repository/user.repository";
import { UserPrincipal } from "src/decorators/principal";
import { UserPhoto, UserPhotoAttribute } from "src/model/user.photo.model";
import { once } from "events";

@Injectable()
export class UserPhotoService {

    //TODO externalize in config.
    private readonly ROOT_FOLDER: string = 'public';
    private readonly FOLDER : string = 'pasta';

    constructor(private readonly userRepository: UserRepository) { }

    async editPhoto(principal: UserPrincipal, file: Express.Multer.File): Promise<UserPhotoAttribute> {

        const ACCEPTED_MIME_TYPES = [
            'image/jpeg',
            'image/png',
        ];

        if (!ACCEPTED_MIME_TYPES.includes(file.mimetype)) {
            throw new UnprocessableEntityException('Format not accepted');
        }

        const user = await this.userRepository.findByPk(principal.id);

        if (!user) {
            throw new NotFoundException('user.not.foud');
        }

        let userPhoto = await UserPhoto.findOne({
            where: {
                userId: principal.id,
            },
        });

        const fileName = `${principal.id}-photo.jpeg`;

        try {
            writeFileSync(join(this.ROOT_FOLDER, this.FOLDER, fileName), file.buffer, { flag: 'w+' })
        } catch (err) {
            Logger.error(err);
            throw new UnprocessableEntityException('folder.not.found');
        }

        if (userPhoto) {
            userPhoto.file = fileName;
            userPhoto.folder = this.FOLDER;
            return userPhoto.save()
                .then((res) => res.toJSON());
        } else {
            userPhoto = await UserPhoto.create({
                file: this.FOLDER,
                folder: fileName,
                userId: principal.id,
            });
            return userPhoto.toJSON();
        }
    }

}