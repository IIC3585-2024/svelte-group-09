<script>
    let username = '';
    let password = '';
  
    async function handleSubmit() {
      // Aquí deberías agregar la lógica para verificar la autenticidad de los datos ingresados
      if (username === 'usuario' && password === 'contraseña') {
        alert('Inicio de sesión exitoso');
      } else {
        alert('Credenciales inválidas');
      }
    }
  </script>
  
  <form on:submit|preventDefault={handleSubmit}>
    <label>
      Usuario:
      <input type="text" bind:value={username} />
    </label>
    <label>
      Contraseña:
      <input type="password" bind:value={password} />
    </label>
    <button type="submit">Iniciar sesión</button>
  </form>
  