// src/stores/user.js
import { writable } from 'svelte/store';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export const user = writable(null);

onAuthStateChanged(auth, (currentUser) => {
  user.set(currentUser);
});