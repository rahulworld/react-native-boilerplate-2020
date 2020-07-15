import Migration from './migrations';
import { reportError } from '../helpers/ErrorReportHelper';

const errorHandler = (transaction, error) => {
  reportError(error, 'InitializeDb');
};

export const seedDb = () => {
  const { db } = global;
  db.transaction((tx) => {
    tx.executeSql('CREATE TABLE IF NOT EXISTS schema_tables(version_number INTEGER NOT NULL, created_at TEXT)');
  }, errorHandler);
};

const callingMigration = (migrationRan, db, migrationFunction) => {
  return new Promise((resolve) => {
    const migration = migrationFunction.shift();
    let migrationNumber = migrationRan;
    if (migration) {
      migrationNumber += 1;
      setTimeout(() => {
        migration().then((result) => {
          if (result) {
            db.transaction((txn) => {
              txn.executeSql('INSERT INTO schema_tables VALUES(?,?)', [migrationNumber, new Date().toISOString()], () => {
                resolve(callingMigration(migrationNumber, db, migrationFunction));
              });
            }, errorHandler);
          } else {
            reportError(result, 'RunMigration');
          }
        });
      }, 0);
    } else {
      resolve(migrationRan);
    }
  });
};

export const runMigration = () => {
  const { db } = global;
  const migrationRan = 0;
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM schema_tables ORDER BY version_number DESC LIMIT 1', [], (txn, result) => {
        if (result.rows.length === 0) {
          callingMigration(migrationRan, db, Migration.slice()).then(() => {
            resolve(true);
          });
        } else {
          const versionNumber = result.rows.item(0).version_number;
          const migrationFunction = Migration.slice(versionNumber);
          callingMigration(versionNumber, db, migrationFunction).then(() => {
            resolve(true);
          });
        }
      }, (txn, error) => {
        reportError(error, 'RunMigration');
        resolve(false);
      });
    }, (txn, error) => {
      reportError(error, 'RunMigration');
      resolve(false);
    });
  });
};
