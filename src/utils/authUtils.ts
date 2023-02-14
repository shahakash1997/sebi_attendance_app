import * as Crypto from 'expo-crypto';
import jwtDecode from 'jwt-decode';

export function isEmptyOrBlank(str: string | null | undefined) {
  return !str || str.length === 0 || /^\s*$/.test(str);
}
export const encrypt = async (plainText: string): Promise<string> => {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA512,
    plainText,
  );
};

export function isTokenExpired(token: string) {
  let decodedData: any = jwtDecode(token);
  return !(decodedData && decodedData.exp * 1000 > Date.now());
}
