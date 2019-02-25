import { Pool, QueryResult } from "pg";
import { DB } from "../shared/db";

export const createPool = (database: string = "postgres") => {
  return new Pool({
    database,
    host: "localhost",
    password: "olivici",
    port: 5432,
    user: "postgres"
  });
};

const pool = createPool("DyjagataStripped");
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});
// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
// async/await - check out a client
export const createFinder = (qstring: string, params?: any[]): DB => {
  return {
    query: async (): Promise<QueryResult> => {
      const client = await pool.connect();
      try {
        const res = await client.query(qstring, params);
        return res;
      } finally {
        client.release();
      }
    }
  };
};
