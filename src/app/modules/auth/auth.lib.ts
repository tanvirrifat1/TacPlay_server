import axios from 'axios';
import appleSigninAuth from 'apple-signin-auth';

export const facebookUser = async (token: string) =>
  (
    await axios.get(
      `https://graph.facebook.com/me?access_token=${token}&fields=name,email,picture.width(300).height(300)`,
    )
  ).data;

export const appleUser = async (token: string) =>
  await appleSigninAuth.verifyIdToken(token, {
    // audience: // TODO: Add your Client ID,
    nonce: null,
  });
