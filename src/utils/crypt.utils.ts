import crypto from 'crypto';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

import { KEY } from '@/config/env';

const finalKey = KEY ?? crypto.randomBytes(32).toString();

export const encrypt = (value: string): string => {
  return AES.encrypt(value, finalKey).toString();
};

export const decrypt = (encryptedValue: string): string => {
  return AES.decrypt(encryptedValue, finalKey).toString(Utf8);
};
