const { Parameter } = require('../../utility/queryBuilder');

exports.create = async (dbClient, requestUserId, data) => {
  const { name, price, code, quantity } = data;
  const sqlStmt = `
    INSERT INTO product 
      ("userId", "code", "name", "price", "quantity")
    VALUES 
      ($1, $2, $3, $4, $5)
    RETURNING "id", "code", "name", "price"::FLOAT, "quantity", "createdAt";
  `;
  const params = [requestUserId, code, name, price, quantity];
  const result = await dbClient.query(sqlStmt, params);
  return result.rows[0];
};

exports.list = async (dbClient, requestUserId, limit, offset, search) => {
  const pm = new Parameter();
  let searchCondition = '';

  if (search) {
    searchCondition = `
      AND (
        "code" ~* ${pm.di(search)}
        OR "name" ~* ${pm.di(search)}
        OR "price"::varchar ~* ${pm.di(search)}
      )
    `;
  }

  const sqlStmt = `
    SELECT
      "id", "code", "name", "price"::FLOAT, "quantity", "createdAt"
    FROM product
    WHERE
      "userId" = ${pm.di(requestUserId)}
      ${searchCondition}
    LIMIT ${pm.di(limit)}
    OFFSET ${pm.di(offset)};
  `;

  const result = await dbClient.query(sqlStmt, pm.values);

  return result.rows;
};

exports.getById = async (dbClient, requestUserId, productId) => {
  const sqlStmt = `
    SELECT
      "id", "code", "name", "price"::FLOAT, "quantity", "createdAt"
    FROM product
    WHERE
      "id" = $1
      AND "userId" = $2;
  `;
  const params = [productId, requestUserId];
  const result = await dbClient.query(sqlStmt, params);
  return result.rows[0];
};

exports.update = async (dbClient, requestUserId, productId, timeStamp, data) => {
  const { name, price, code, quantity } = data;
  const sqlStmt = `
    UPDATE "product"
    SET
      "code" = $1,
      "name" = $2,
      "price" = $3,
      "quantity" = $4,
      "updatedAt" = $5
    WHERE
      "id" = $6
      AND "userId" = $7;
  `;
  const params = [code, name, price, quantity, timeStamp, productId, requestUserId];
  await dbClient.query(sqlStmt, params);
};

exports.delete = async (dbClient, requestUserId, productId) => {
  const sqlStmt = `
    DELETE FROM "product"
    WHERE
      "id" = $1
      AND "userId" = $2;
  `;
  const params = [productId, requestUserId];
  await dbClient.query(sqlStmt, params);
};
