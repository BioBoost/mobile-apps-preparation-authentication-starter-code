console.log("Mobile Apps Preparation - Authentication with Passport.js");

import express from 'express';
import config from './config/config.js';
import { Users } from './database/database.js';
import { validate } from 'jsonschema';
import { AuthenticationSchema } from './validation/authentication.js';

const app = express();      // Create Express App
app.use(express.json());    // Enable json body parsing

// Just a basic welcome route
app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Passport.js demo'
  });
});

// Allow a user to register a new account
app.post('/register', (req, res) => {
  // Never, ever thrust client side data !
  const validation = validate(req.body, AuthenticationSchema.register.body);
  if (!validation.valid) {
    return res.status(400).send({
      message: 'Invalid user information',
      errors: validation.errors.map(e => e.stack)
    });
  }

  res.send({
    message: 'Not implemented yet !'
  })
});

// Start listening for incoming connection
app.listen(config.general.port, () => {
  console.log(`Authentication server is listening at port ${config.general.port}`)
});