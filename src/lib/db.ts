import { sql } from '@vercel/postgres';

// ─────────────────────────────────────────────
//  데이터 액세스 레이어 (Vercel Postgres)
//  - 모든 쿼리는 파라미터 바인딩(태그드 템플릿)으로 SQL 인젝션 방지
//  - ensureSchema() 로 테이블을 멱등 생성 (인스턴스당 1회)
// ─────────────────────────────────────────────

export interface DbUser {
  id: number;
  email: string;
  password_hash: string | null;
  name: string;
  provider: string;
  created_at: string;
}

export interface DbCartItem {
  id: number;
  user_id: number;
  product_id: string;
  quantity: number;
  created_at: string;
}

let schemaReady = false;

export async function ensureSchema(): Promise<void> {
  if (schemaReady) return;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT,
      name TEXT NOT NULL,
      provider TEXT NOT NULL DEFAULT 'credentials',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS cart_items (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      product_id TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE (user_id, product_id)
    );
  `;
  schemaReady = true;
}

// ── Users ──────────────────────────────────────
export async function getUserByEmail(email: string): Promise<DbUser | null> {
  await ensureSchema();
  const { rows } = await sql<DbUser>`SELECT * FROM users WHERE email = ${email} LIMIT 1;`;
  return rows[0] ?? null;
}

export async function createUser(p: {
  email: string;
  passwordHash: string;
  name: string;
}): Promise<DbUser> {
  await ensureSchema();
  const { rows } = await sql<DbUser>`
    INSERT INTO users (email, password_hash, name, provider)
    VALUES (${p.email}, ${p.passwordHash}, ${p.name}, 'credentials')
    RETURNING *;
  `;
  return rows[0];
}

/** 소셜 로그인 사용자 upsert (이메일 기준) */
export async function upsertOAuthUser(
  email: string,
  name: string,
  provider: string,
): Promise<DbUser> {
  await ensureSchema();
  const { rows } = await sql<DbUser>`
    INSERT INTO users (email, name, provider)
    VALUES (${email}, ${name}, ${provider})
    ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
    RETURNING *;
  `;
  return rows[0];
}

export async function updateUserName(userId: number, name: string): Promise<void> {
  await ensureSchema();
  await sql`UPDATE users SET name = ${name} WHERE id = ${userId};`;
}

// ── Cart ───────────────────────────────────────
export async function getCartItems(userId: number): Promise<DbCartItem[]> {
  await ensureSchema();
  const { rows } = await sql<DbCartItem>`
    SELECT * FROM cart_items WHERE user_id = ${userId} ORDER BY created_at ASC;
  `;
  return rows;
}

export async function addCartItem(
  userId: number,
  productId: string,
  qty: number,
): Promise<void> {
  await ensureSchema();
  await sql`
    INSERT INTO cart_items (user_id, product_id, quantity)
    VALUES (${userId}, ${productId}, ${qty})
    ON CONFLICT (user_id, product_id)
    DO UPDATE SET quantity = cart_items.quantity + ${qty};
  `;
}

export async function setCartQty(
  userId: number,
  productId: string,
  qty: number,
): Promise<void> {
  await ensureSchema();
  if (qty <= 0) {
    await removeCartItem(userId, productId);
    return;
  }
  await sql`
    UPDATE cart_items SET quantity = ${qty}
    WHERE user_id = ${userId} AND product_id = ${productId};
  `;
}

export async function removeCartItem(userId: number, productId: string): Promise<void> {
  await ensureSchema();
  await sql`DELETE FROM cart_items WHERE user_id = ${userId} AND product_id = ${productId};`;
}

export async function getCartCount(userId: number): Promise<number> {
  await ensureSchema();
  const { rows } = await sql<{ total: string }>`
    SELECT COALESCE(SUM(quantity), 0)::text AS total FROM cart_items WHERE user_id = ${userId};
  `;
  return Number(rows[0]?.total ?? 0);
}
