import mysql from "mysql2/promise";

// One pool per server process; kept on globalThis so dev hot-reloads don't open new pools.
const globalForDb = globalThis as unknown as { dbPool?: mysql.Pool };

export function db(): mysql.Pool {
  if (!globalForDb.dbPool) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    globalForDb.dbPool = mysql.createPool({
      uri: url,
      connectionLimit: 5,
      charset: "utf8mb4",
      dateStrings: false,
      // The host's MariaDB drops connections that sit idle (wait_timeout). Close idle ones ourselves
      // well before that, so a request never picks up a connection the server already hung up on.
      maxIdle: 0,
      idleTimeout: 30_000,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10_000,
    });
  }
  return globalForDb.dbPool;
}

// Errors that mean the connection died before the query ran; a fresh connection will work.
const DEAD_CONNECTION = new Set(["PROTOCOL_CONNECTION_LOST", "ECONNRESET", "EPIPE", "ETIMEDOUT", "ER_CLIENT_INTERACTION_TIMEOUT"]);
const isDeadConnection = (error: unknown) => DEAD_CONNECTION.has((error as { code?: string })?.code ?? "");

async function withRetry<T>(run: () => Promise<T>): Promise<T> {
  try {
    return await run();
  } catch (error) {
    if (!isDeadConnection(error)) throw error;
    console.warn("DB connection was closed by the server; retrying once.", (error as { code?: string }).code);
    return run();
  }
}

export async function query<T = mysql.RowDataPacket>(sql: string, params: unknown[] = []): Promise<T[]> {
  const [rows] = await withRetry(() => db().query(sql, params));
  return rows as T[];
}

export async function execute(sql: string, params: unknown[] = []): Promise<mysql.ResultSetHeader> {
  const [result] = await withRetry(() => db().execute(sql, params as never));
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
