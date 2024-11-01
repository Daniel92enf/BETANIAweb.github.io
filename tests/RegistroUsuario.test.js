const request = require('supertest');
const app = require('../app'); // Apunta a tu app.js

describe('Pruebas del registro de usuario', () => {
  
  // Prueba de registro exitoso
  it('POST /Registro_usuario - debe registrar un usuario exitosamente', async () => {
    const userData = {      
      password: 'password123',
      email: 'nuevoUsuario@example.com',
      name: 'Nombre del Usuario'
    };

    const res = await request(app)
      .post('/Registro_usuario')
      .send(userData)  // Enviar los datos del nuevo usuario
      .expect(200);    // Esperamos un código de estado 200 si todo va bien
    
    // Verificamos que el cuerpo de la respuesta tenga la propiedad "mensaje" de éxito
    expect(res.body).toHaveProperty('message', `Usuario ${userData.name.toLowerCase()}`);
  });

  // Prueba de error cuando faltan campos requeridos
  it('POST /Registro_usuario - debe fallar si faltan campos requeridos', async () => {
    const incompleteData = {
      name: 'incompletoUsuario',
      // Falta el campo 'password'
      email: 'incompletoUsuario@example.com'
    };

    const res = await request(app)
      .post('/Registro_usuario')
      .send(incompleteData)  // Enviar datos incompletos
      .expect(400);          // Esperamos un código de estado 400 debido a la validación fallida
    
    // Verificamos que el cuerpo de la respuesta tenga un mensaje de error adecuado
    expect(res.body).toHaveProperty('error', 'Es necesario ingresar una contraseña');    
  });

  // Prueba de error cuando se envía un email ya registrado
  it('POST /Registro_usuario - debe fallar si el email ya está registrado', async () => {
    const existingUserData = {
      name: 'Usuario Existente',
      password: 'password123',
      email: 'usuarioExistente@example.com',      
    };

    // Simular un registro de un usuario ya existente
    await request(app)
      .post('/Registro_usuario')
      .send(existingUserData)
      .expect(200);  // Registro exitoso inicial (o en tu base de datos deberías tener este usuario)

    // Intentar registrar nuevamente con el mismo email
    const res = await request(app)
      .post('/Registro_usuario')
      .send(existingUserData)
      .expect(409);  // Esperamos un código de estado 409 por conflicto
    
    // Verificamos que el cuerpo de la respuesta tenga un mensaje de error adecuado
    expect(res.body).toHaveProperty('error', "Error el correo ya existe");
  });

});
