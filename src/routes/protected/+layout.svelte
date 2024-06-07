<!-- src/routes/protected/+layout.svelte -->
<script context="module">
  import { auth } from '../../firebaseConfig.js';
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import { goto } from '$app/navigation';

  export const load = async ({ fetch, session, redirect }) => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve({ user });
        } else {
          reject(redirect(302, '/auth'));
        }
      });
    });
  };
</script>

<slot />
