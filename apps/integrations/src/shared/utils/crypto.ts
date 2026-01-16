import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

export const encrypt = (value: string, key: string): string => {
	return AES.encrypt(value, key).toString();
};

export const decrypt = (encryptedValue: string, key: string): string => {
	return AES.decrypt(encryptedValue, key).toString(Utf8);
};
