#!/usr/bin/env sh

# Attendre que le service de base de données soit prêt



cd ./server && node ./bin/migrate.js && node ./bin/seed.js && node index.js



