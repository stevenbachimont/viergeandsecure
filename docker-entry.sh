#!/usr/bin/env sh

# Attendre que le service de base de données soit prêt
until nc -z -v -w30 $DB_HOST $DB_PORT
do
  echo "Waiting for database connection..."
  sleep 5
done

cd ./server && node ./bin/migrate.js && node ./bin/seed.js && node index.js
