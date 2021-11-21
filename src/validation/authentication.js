const AuthenticationSchema = {
  register: {
    body: {
      "type": "object",
      "properties": {
        "email": { "type": "string" },
        "password": { "type": "string" },
      },
      "required": ["email", "password"]
    }
  },
  login: {
    body: {
      "type": "object",
      "properties": {
        "email": { "type": "string" },
        "password": { "type": "string" },
      },
      "required": ["email", "password"]
    }
  }
}

export { AuthenticationSchema }