require("dotenv").config();

const { DB_NAME } = process.env;

const path = require('path');
const fs = require('fs');
const database = require("../database/client");

const fixturesDirectory = path.join(__dirname, '../database/fixtures');

fs.readdirSync(fixturesDirectory).forEach(file => {
  if (file === '.DS_Store') {
    return null;
  }
  return undefined;
});

const seed = async () => {
  try {
    const dependencyMap = {};

    fs.readdirSync(fixturesDirectory)
        .filter((filePath) => !filePath.startsWith("Abstract"))
        .forEach((filePath) => {
          const SeederClass = require(path.join(fixturesDirectory, filePath));
          const seeder = new SeederClass();
          dependencyMap[SeederClass] = seeder;
        });

    const sortedSeeders = [];
    const solveDependencies = (n) => {
      n.dependencies.forEach((DependencyClass) => {
        const dependency = dependencyMap[DependencyClass];
        if (!sortedSeeders.includes(dependency)) {
          solveDependencies(dependency);
        }
      });
      if (!sortedSeeders.includes(n)) {
        sortedSeeders.push(n);
      }
    };

    Object.values(dependencyMap).forEach((seeder) => {
      solveDependencies(seeder);
    });

    const doTruncate = async (stack) => {
      if (stack.length === 0) {
        return;
      }
      const firstOut = stack.pop();
      await database.query(`delete from ${firstOut.table}`);
      await doTruncate(stack);
    };

    await doTruncate([...sortedSeeders]);

    const doRun = async (queue) => {
      if (queue.length === 0) {
        return;
      }
      const firstOut = queue.shift();
      firstOut.run();
      await Promise.all(firstOut.promises);
      await doRun(queue);
    };

    await doRun(sortedSeeders);

    database.end();

    console.info(`${DB_NAME} updated from '${path.normalize(fixturesDirectory)}' 👾`);
  } catch (err) {
    console.error("Error filling the database:", err.message, err.stack);
  }
};

seed();
