import * as Crypto from "expo-crypto";

export const encrypt = async (plainText: string): Promise<string> => {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA512,
    plainText,
  );
};
