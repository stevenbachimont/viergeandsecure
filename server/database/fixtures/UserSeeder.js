const AbstractSeeder = require("./AbstractSeeder");

class UserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "user", truncate: true });
  }

  run() {
    const users = [
      {
        alias: "flippo",
        email: "flippo@example.com",
        hashed_password:
          "$argon2id$v=19$m=19456,t=2,p=1$rQcSnCLNYupL72R1/tzplQ$NImvLcK++gA/aTygbIzpWcBE6z21+kCccHcNomR6xBg",
        profile_picture: "http://localhost:3310/uploadsAvatars/un.jpg",
        is_admin: 0,
        is_verify: 0,
      },
      {
        alias: "steven",
        email: "stev.bach@example.com",
        hashed_password:
          "$argon2id$v=19$m=19456,t=2,p=1$cX8MgcA4iMKrhGQDvjlhAg$mG4VqjY1vonuXmNpMkexBmW3r4V7nsoitrrUpT9vDEc",
        profile_picture: "http://localhost:3310/uploadsAvatars/cinq.jpg",
        is_admin: 1,
        is_verify: 1,
      },
    ];

    users.forEach((user) => {
      this.insert(user);
    });
  }
}

module.exports = UserSeeder;
