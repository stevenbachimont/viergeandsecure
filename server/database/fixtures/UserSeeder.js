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
        is_verify: 1,
      },
      {
        alias: "kiki",
        email: "kiki@example.com",
        hashed_password:
          "$argon2id$v=19$m=19456,t=2,p=1$Vcy/8DFEKd2/aiCXB8ERnQ$VXq2S0ln0XJKTsds7XDKHpoT3wIzSNQAQ5QJTXrg22U",
        profile_picture: "http://localhost:3310/uploadsAvatars/kiki.png",
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
