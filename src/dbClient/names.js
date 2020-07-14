const getNameData = () => {
    const { db } = global;
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql('Select * from names ORDER BY active desc, position', [], (transaction, result) => {
          const ids = [];
          if (result.rows.length > 0) {
            for (let i = 0; i < result.rows.length; i += 1) {
              ids.push(result.rows.item(i));
            }
            resolve(ids);
          } else {
            resolve(ids);
          }
        }, errorHandler);
      }, errorHandler);
    });
};