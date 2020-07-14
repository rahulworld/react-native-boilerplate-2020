import { reportError } from '../../helpers/ErrorReportHelper';

const errorHandler = (transaction, error) => {
  reportError(error, 'InitializeDb');
};

export const createTable_001 = () => { //eslint-disable-line
  const { db } = global;
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS report_issues(id INTEGER PRIMARY KEY AUTOINCREMENT,problem_type INTEGER,' +
      'question_id INTEGER, message TEXT, created_at TEXT);', [], errorHandler);
      tx.executeSql('CREATE TABLE IF NOT EXISTS persons(id INTEGER PRIMARY KEY, name TEXT, subject_id INTEGER NOT NULL' +
      ',unit_id INTEGER NOT NULL, position INTEGER NOT NULL DEFAULT 0, downloaded INTEGER DEFAULT 0, image textValue, active INTEGER DEFAULT 0);', [], errorHandler);
      resolve(true);
    }, (tx, error) => {
      console.log('error', error);
      reportError(error, 'InitialeDb');
      resolve(false);
    });
  });
};
