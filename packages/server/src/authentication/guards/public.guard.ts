import { SetMetadata } from '@nestjs/common';

export const PUBLIC_KEY = 'isPublic';

export const SetPublic = () => SetMetadata(PUBLIC_KEY, true);
