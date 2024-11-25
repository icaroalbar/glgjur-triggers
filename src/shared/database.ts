import { pool } from "@libs/database";
import { PoolClient } from "pg";

export class Database {
  public static async query(
    query: string,
    values?: unknown[]
  ): Promise<any[] | null> {
    const client: PoolClient = await pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rows;
    } catch (error) {
      console.error("Error executing query", error);
      return null;
    } finally {
      client.release();
    }
  }
}
