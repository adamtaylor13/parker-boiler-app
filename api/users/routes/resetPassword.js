'use strict';

const User = require('../model/User');
const Boom = require('boom');
const { verifyUniqueUser, hashPassword } = require('../util/userFunctions');
const postmark = require('postmark');
const client = new postmark.Client('6e1273da-19c3-44ca-9eaf-623e1b4d34f5');


module.exports = {
  method: 'POST',
  path: '/api/users/resetPassword',
  config: {
    pre: [
      { method: verifyUniqueUser, assign: 'user' }
    ],
    handler: (req, res) => {

      User
        .findOne(
          { email: req.payload.email },
          (err, user) => {
            if (err) {
              throw Boom.badRequest(err);
            }

            console.log('==>> user', user);
            res({}).code(200);
          });

      // if (!req.payload.newPassword) {
      //       throw Boom.badRequest('You didn\'t provide a new password.');
      // }

      // hashPassword(req.payload.newPassword, (err, hash) => {
      //   if (err) { throw Boom.badRequest(err); }

      //   let password = hash;
      //   console.log('==>> password', password);
      //   console.log('==>> req.auth.credentials.id', req.auth.credentials.id);
      //   console.log('==>> typeof password', typeof password);
      //   User
      //     .update(
      //       { _id: req.auth.credentials.id },
      //       {
      //         $set: { password: password }
      //       }
      //     );
        // res({}).code(200);
      // });
    },
    // Add authentication to this route
    // The user must have a scope of `admin`
    auth: {
      strategy: 'jwt',
      scope: ['admin'],
    },
  }
}
