/* eslint-disable consistent-return */
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

// Options de hachage
const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

// Middleware pour hacher le mot de passe
const hashPassword = async (req, res, next) => {
  try {
    if (!req.body.hashed_password) {
      return res
          .status(400)
          .send({ message: "The hashed_password field is required." });
    }

    // Hachage du mot de passe avec les options spécifiées
    const hashedPassword = await argon2.hash(
        req.body.hashed_password,
        hashingOptions
    );
    req.body.hashedPassword = hashedPassword;

    delete req.body.hashed_password;

    next();
  } catch (err) {
    next(err);
  }
};

// Middleware pour vérifier le token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;

  if (!token) {
    return res.status(401).json({ valid: false, message: "No token provided" });
  }

  jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
            .status(401)
            .json({ valid: false, message: "Token has expired" });
      }
      return res
          .status(401)
          .json({ valid: false, message: "Failed to authenticate token" });
    }

    req.user = decoded; // Attacher les informations de l'utilisateur à la requête
    next();
  });
};

// Gestionnaire de connexion
const login = async (req, res, next) => {
  const { alias, password } = req.body;

  try {
    if (!alias || !password) {
      return res
          .status(400)
          .json({ message: "Alias and password are required" });
    }

    // Lire l'utilisateur par alias
    const user = await tables.user.readByAlias(alias);
    if (!user) {
      return res.status(400).json({ message: "Invalid alias or password" });
    }

    // Vérifier si le mot de passe correspond
    const isPasswordMatch = await argon2.verify(user.hashedPassword, password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid alias or password" });
    }

    // Créer le payload du token
    const tokenPayload = {
      id: user.id,
      alias: user.alias,
      isAdmin: user.isAdmin,
      isVerify: user.isVerify,
      profilePicture: user.profilePicture,
      user: user.email,
    };

    // Signer le token JWT
    const token = jwt.sign(tokenPayload, process.env.APP_SECRET);

    // Supprimer le mot de passe haché de l'objet utilisateur
    delete user.hashedPassword;

    // Répondre avec le token et les informations de l'utilisateur
    res.json({
      token,
      ...tokenPayload,
    });
  } catch (err) {
    console.error(`Error during login: ${err.message}`);
    next(err);
  }
};

module.exports = {
  hashPassword,
  verifyToken,
  login,
};
