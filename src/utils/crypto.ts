import CryptoJS from "crypto-js";

const aesKey = process.env.NEXT_PUBLIC_AES_KEY as string;
export const encryptAES = (text: string) => {
  const encrypted = CryptoJS.AES.encrypt(text, aesKey);
  return encrypted.toString();
};

export const decryptAES = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, aesKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
