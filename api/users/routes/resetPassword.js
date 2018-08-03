'use strict';

const Users = require('../model/User');
const Boom = require('boom');
const { hashPassword } = require('../util/userFunctions');

module.exports = {
  method: 'POST',
  path: '/api/users/resetPassword',
  config: {
    handler: (req, res) => {

      if (!req.payload.newPassword) {
            throw Boom.badRequest('You didn\'t provide a new password.');
      }

      hashPassword(req.payload.newPassword, (err, hash) => {
        if (err) { throw Boom.badRequest(err); }

        let password = hash;
        console.log('==>> password', password);
        console.log('==>> req.auth.credentials.id', req.auth.credentials.id);
        console.log('==>> typeof password', typeof password);
        Users
          .update(
            { _id: req.auth.credentials.id },
            {
              $set: { password: password }
            }
          );

        res({}).code(200);
      });
    },
    // Add authentication to this route
    // The user must have a scope of `admin`
    auth: {
      strategy: 'jwt',
      scope: ['admin'],
    },
  }
}
