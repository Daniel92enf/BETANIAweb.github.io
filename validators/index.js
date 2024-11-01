const executeQuery = require('../helpers/queryHelper');
const { body, validationResult } = require("express-validator");

const valitateRequest = (req, res, next) => {
  const errorValidation = validationResult(req);
  if (!errorValidation.isEmpty()) {
    const arr = errorValidation.array();
    const keyFirstError = arr[0].msg;
    return res.error(keyFirstError, 400);
  }
  next();
}

module.exports = {
  validateLogin: [
    body('email_login', 'Es necesario ingresar un usuario')
      .notEmpty()
      .isLength({ min: 5 })
      .toLowerCase()
      .trim(),
    body('password_login', 'Es necesario ingresar una contraseña')
      .notEmpty()
      .isLength({ min: 5 })
      .toLowerCase()
      .trim(),
    valitateRequest,
    async (req, res, next) => {
      const { email_login, password_login } = req.body;
      const sql = `SELECT * FROM usuarios WHERE email='${email_login}'`;

      const params = [1]; // Ejemplo de parámetro, aquí se indica que queremos usuarios activos

      const [usuario] = await executeQuery(sql, params);
      if (!usuario) return res.error('Error al obtener usuarios', 500);
      if (password_login !== usuario.password) return res.error('Error al obtener usuarios', 500);
      req.session.user = usuario;
      next();
    }
  ],
  validateChangePassword: [
    body("password_actual", "Es necesario ingresar contraseña actual")
      .notEmpty()
      .isLength({ min: 5 })
      .toLowerCase()
      .trim(),
    body("password_nueva", "Es necesario ingresar nueva contraseña")
      .notEmpty()
      .isLength({ min: 5 })
      .toLowerCase()
      .trim(),
    body("confirmar_password", "Es necesario confirmar contraseña")
      .notEmpty()
      .isLength({ min: 5 })
      .toLowerCase()
      .trim(),
    valitateRequest,
    async (req, res, next) => {
      const { password_actual, password_nueva, confirmar_password } = req.body;
      if (!req.session.user) return res.error('No existe una sesión activa', 500);
      if (req.session.user.password !== password_actual) return res.error('Contraseña incorrecta', 500);
      if (password_actual === password_nueva) return res.error('Su contraseña actual no puede ser igual a la contraseña anterior', 500);
      if (password_nueva !== confirmar_password) return res.error('La nueva contraseña no coincide', 500);
      next();
    }
  ],
  validateRegister: [
    body('name', 'Es necesario ingresar un nombre')
      .notEmpty()
      .isLength({ min: 5 })
      .trim(),
    body('password', 'Es necesario ingresar una contraseña')
      .notEmpty()
      .isLength({ min: 5 })
      .trim(),
    body('email', 'Es necesario ingresar un correo electrónico')
      .notEmpty()
      .isEmail()
      .trim(),
    valitateRequest,
    async (req, res, next) => {
      const { email } = req.body;
      const sql = `SELECT * FROM usuarios WHERE email='${email}'`;

      const params = []; // Ajusta los parámetros si es necesario

      const [usuario] = await executeQuery(sql, params);
      if (usuario) return res.error('Error: el correo ya existe', 409);
      next();
    }
  ], // Aquí es donde se debe agregar la coma
  validateRegisterTrabajador: [
    body('name', 'Es necesario ingresar un nombre')
      .notEmpty()
      .isLength({ min: 5 })
      .trim(),
    body('password', 'Es necesario ingresar una contraseña')
      .notEmpty()
      .isLength({ min: 5 })
      .trim(),
    body('email', 'Es necesario ingresar un correo electrónico')
      .notEmpty()
      .isEmail()
      .trim(),
    valitateRequest,
    async (req, res, next) => {
      const { email } = req.body;
  
      // Verifica si el correo ya existe en la tabla 'trabajador'
      const sql = `SELECT * FROM trabajador WHERE email='${email}'`;
      const params = []; // Ajusta los parámetros si es necesario
  
      const [trabajador] = await executeQuery(sql, params);
      if (trabajador) {
        return res.error('Error: el correo ya existe en el registro de trabajadores', 409);
      }
      next();
    }
  ]
}
