<script>
    import { auth } from '../../firebaseConfig.js';
    import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
    import { goto } from '$app/navigation';
    
    let email = '';
    let password = '';
  
    const signup = async () => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        goto('/protected');
      } catch (error) {
        console.error('Error signing up:', error);
      }
    };
  
    const login = async () => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        goto('/protected');
      } catch (error) {
        console.error('Error logging in:', error);
      }
    };
  </script>
  
  <main>
    <h1>Login</h1>
    <input type="email" bind:value={email} placeholder="Email" />
    <input type="password" bind:value={password} placeholder="Password" />
    <button on:click={login}>Login</button>
    <button on:click={signup}>Signup</button>
  </main>
  