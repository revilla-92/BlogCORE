
// Definicion del modulo favoritos.

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Favourite',
      { best: {
           type: DataTypes.INTEGER,
           validate: {
              notEmpty: {msg: "El campo best no puede estar vacío"},
              max: {args: 5,
              	msg: "El campo best debe ser menor o igual a 5"},
              min: {args: 1,
              	msg: "El campo best debe ser mayor o igual a 1"}
           }
        }
      });
}
