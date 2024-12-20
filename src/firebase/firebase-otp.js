import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from './firebase';

export const generateRecaptcha = () => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    'recaptcha-container',
    {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log(`recaptcha response => ${response}`);
      }
    },

  );
}

export const requestOTP = (mobile) => {
  const phoneNumber = '+57' + mobile
  console.log(`phone number => ${phoneNumber}`);
  generateRecaptcha();
  let appVerifier = window.recaptchaVerifier
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      console.log(`confirmation of otp => ${JSON.stringify(confirmationResult)}`);
    }).catch((error) => {
      console.log(`error=> ${error.message}`);
      console.log(`porquee!!! , ja , quiero llorar`);
    });
}
export const verifyOTP = (otp) => {
  console.log(otp);
  let confirmationResult = window.confirmationResult;
  confirmationResult.confirm(otp).then((result) => {
    console.log(result);
    console.log(JSON.stringify(result));
    const user = result.user;
    console.log(`signed in successfully as ${JSON.stringify(user)}`);
    // ...
  }).catch((error) => {
    console.log(`error=> ${error.message}`);
  });
}