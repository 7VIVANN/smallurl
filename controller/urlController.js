const db = require('./init');

const TABLE = process.env.TABLE_NAME;

async function getRowId(shortUrl) {

    console.log('Row id query: ');
    return new Promise((resolve, reject) => {          // return new Promise here <---

        let sql = `SELECT * FROM ${TABLE} WHERE shortUrl='${shortUrl}'`;    // INSERT <----

        return db.get(sql, function (err, row) { // .run <----
            if (err) {
                console.error("DB Error: Select failed: ", err.message);
                return reject(err.message);
            }
            return resolve(row ? row.id : undefined);
        });
    });
}

async function getRowIdForLongUrl(longUrl) {

    console.log('Row id for longURL query: ');
    return new Promise((resolve, reject) => {          // return new Promise here <---

        let sql = `SELECT * FROM ${TABLE} WHERE longUrl='${longUrl}'`;    // INSERT <----

        return db.get(sql, function (err, row) { // .run <----
            if (err) {
                console.error("DB Error: Select failed: ", err.message);
                return reject(err.message);
            }
            return resolve(row ? row.id : undefined);
        });
    });
}

async function getLongUrl(shortUrl) {

    // console.log('Row id query: ');
    return new Promise((resolve, reject) => {          // return new Promise here <---
        let sql = `SELECT * FROM ${TABLE} WHERE shortUrl='${shortUrl}'`;    // INSERT <----

        // console.log('sql query: ', sql);
        return db.get(sql, function (err, row) { // .run <----
            if (err) {
                console.error("DB Error: Select failed: ", err.message);
                return reject(err.message)
            }
            // console.log('Row query for longurl resulted in', row);
            if (row !== undefined) {
                console.log('resolving to router with ', row.longUrl);
                return resolve(row.longUrl)
            }
            else {
                return reject("longurl doesnt exist")
            }
        });
    });
}


async function insert(longUrl, shortUrl) {
    const rowId = await getRowIdForLongUrl(longUrl)
    return new Promise((resolve, reject) => {          // return new Promise here <---
        if (rowId == undefined) {
            let sql = `INSERT INTO ${TABLE}(longUrl, shortUrl) VALUES('${longUrl}', '${shortUrl}')`;    // INSERT <----

            return db.run(sql, function (err, res) { // .run <----
                if (err) {
                    console.error("DB Error: Insert failed: ", err.message);
                    return reject(err.message);
                }
                return resolve("inserted row with row id: ", res.lastID);
            });
        }
        else {
            return reject("DB Error: longUrl alreadyExists: ");
        }
    });
}


module.exports = {
    getRowId,
    getLongUrl,
    insert
}