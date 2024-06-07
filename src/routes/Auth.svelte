<!-- src/routes/auth/+page.svelte -->
<script>
    import { auth } from '../../firebaseConfig.js';
    import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
    import { writable } from 'svelte/store';
    import { goto } from '$app/navigation';
  
    let email = '';
    let password = '';
    let error = writable('');
  
    const signUp = async () => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        error.set('');
        goto('/protected');
      } catch (e) {
        error.set(e.message);
      }
    };
  
    const login = async () => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        error.set('');
        goto('/protected');
      } catch (e) {
        error.set(e.message);
      }
    };
  </script>
  
  <main>
    <h1>Sign Up / Login</h1>
  
    <input type="email" bind:value={email} placeholder="Email" />
    <input type="password" bind:value={password} placeholder="Password" />
  
    <button on:click={signUp}>Sign Up</button>
    <button on:click={login}>Login</button>
  
    <p>{$error}</p>
  </main>
  
  <style>
    main {
      display: flex;
      flex-direction: column;
      width: 300px;
      margin: auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 10px;
    }
  
    input {
      margin-bottom: 10px;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  
    button {
      margin-bottom: 10px;
      padding: 8px;
      border: none;
      border-radius: 4px;
      background-color: #007BFF;
      color: white;
      cursor: pointer;
    }
  
    button:hover {
      background-color: #0056b3;
    }
  
    p {
      color: red;
    }
  </style>
  