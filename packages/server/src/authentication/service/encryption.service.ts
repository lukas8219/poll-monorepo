import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private _algorithm = 'sha256';

  encrypt(value: string, encoding?: Encoding) {
    const encrypter = crypto.createHash(this._algorithm);
    encrypter.update(value);
    return encrypter.digest(encoding || 'hex');
  }

}

type Encoding = 'base64' | 'hex' | 'base64url';
