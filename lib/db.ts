import mysql from "mysql2/promise";

// One pool per server process; kept on globalThis so dev hot-reloads don't open new pools.
const globalForDb = globalThis as unknown as { dbPool?: mysql.Pool };

export function db(): mysql.Pool {
  if (!globalForDb.dbPool) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    globalForDb.dbPool = mysql.createPool({ uri: url, connectionLimit: 5, charset: "utf8mb4", dateStrings: false });
  }
  return globalForDb.dbPool;
}

export async function query<T = mysql.RowDataPacket>(sql: string, params: unknown[] = []): Promise<T[]> {
  const [rows] = await db().query(sql, params);
  return rows as T[];
}

export async function execute(sql: string, params: unknown[] = []): Promise<mysql.ResultSetHeader> {
  const [result] = await db().execute(sql, params as never);
  return result as mysql.ResultSetHeader;
}

// MariaDB stores JSON as LONGTEXT, so JSON columns may arrive as strings.
export function parseJson<T>(value: unknown, fallback: T): T {
  if (value === null || value === undefined) return fallback;
  if (typeof value !== "string") return value as T;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}
