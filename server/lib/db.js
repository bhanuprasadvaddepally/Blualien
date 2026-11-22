import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(serverDirectory, '../..');

function resolveDatabasePath() {
  const configuredPath = process.env.DATABASE_PATH || 'server/data/blualien.sqlite';
  return path.isAbsolute(configuredPath)
    ? configuredPath
    : path.resolve(projectRoot, configuredPath);
}

const databasePath = resolveDatabasePath();
fs.mkdirSync(path.dirname(databasePath), { recursive: true });

const db = new Database(databasePath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    message TEXT NOT NULL,
    source_ip TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE COLLATE NOCASE,
    source_ip TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const insertLead = db.prepare(`
  INSERT INTO leads (name, email, company, message, source_ip)
  VALUES (@name, @email, @company, @message, @sourceIp)
`);

const insertSubscriber = db.prepare(`
  INSERT INTO subscribers (email, source_ip)
  VALUES (@email, @sourceIp)
  ON CONFLICT(email) DO NOTHING
`);

export function createLead(lead) {
  const result = insertLead.run({
    ...lead,
    company: lead.company || null,
  });
  return { id: result.lastInsertRowid };
}

export function createSubscriber({ email, sourceIp }) {
  const result = insertSubscriber.run({ email, sourceIp });
  return { created: result.changes > 0 };
}

export function closeDatabase() {
  db.close();
}
