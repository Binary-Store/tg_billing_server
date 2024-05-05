exports.create = async (dbClient, name, email, phone, password, timeStamp) => {
  const sqlStmt = `
    INSERT INTO "user"
      ("name", "email", "phone", "password", "createdAt")
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING 
      "id", "name", "email", "phone";
  `;
  const params = [name, email, phone, password, timeStamp];
  const result = await dbClient.query(sqlStmt, params);
  return result.rows[0];
};

exports.getByEmail = async (dbClient, email) => {
  const sqlStmt = `
    SELECT
      "id", "name", "email", "phone", "password"
    FROM "user" 
    WHERE 
      "email" = $1;
  `;
  const params = [email];
  const result = await dbClient.query(sqlStmt, params);
  return result.rows[0];
};
