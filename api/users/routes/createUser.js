'use strict';

const bcrypt = require('bcryptjs');
const Boom = require('boom');
const User = require('../model/User');
const createUserSchema = require('../schemas/createUser');
const { verifyUniqueUser, hashPassword } = require('../util/userFunctions');
const createToken = require('../util/token');

module.exports = {
  method: 'POST',
  path: '/api/users',
  config: {
    auth: false,
    // Before the route handler runs, verify that the user is unique
    pre: [
      { method: verifyUniqueUser }
    ],
    handler: (req, res) => {
      let user = new User();
      user.email = req.payload.email;
      user.admin = true;
      hashPassword(req.payload.password, (err, hash) => {
        if (err) {
          throw Boom.badRequest(err);
        }
        user.password = hash;
        user.save((err, user) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          // If the user is saved successfully, issue a JWT
          res({ id_token: createToken(user) }).code(201);
        });
      });

    },
    // Validate the payload against the Joi schema
    validate: {
      payload: createUserSchema
    }
  }
}
