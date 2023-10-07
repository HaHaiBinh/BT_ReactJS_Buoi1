// fake api
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const userApi = {
  getMe: () => {
    // todo: call api to get current user

    return new Promise((resolve, reject) => {
      // fake api wait 500ms -> return result
      setTimeout(() => {
        const currentUser = firebase.auth().currentUser();

        resolve({
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
          photoUrl: currentUser.photoUrl,
        });
      }, 500);
    });
  },
};
