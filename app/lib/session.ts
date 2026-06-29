import { cookies } from "next/headers";
import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const KEY_LENGTH = 32;

const SECRET = process.env.SESSION_SECRET || "ast-solar-imperial-construction-secret-2026";

function getKey(): Buffer {
  return crypto.createHash("sha256").update(SECRET).digest();
}

export interface SessionPayload {
  username: string;
  expiresAt: string;
}

export function encrypt(payload: SessionPayload): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = getKey();
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(JSON.stringify(payload), "utf8", "hex");
  encrypted += cipher.final("hex");
  
  const tag = cipher.getAuthTag().toString("hex");
  
  // Format: iv:encrypted:tag
  return `${iv.toString("hex")}:${encrypted}:${tag}`;
}

export function decrypt(token: string): SessionPayload | null {
  try {
    const parts = token.split(":");
    if (parts.length !== 3) return null;
    
    const [ivHex, encryptedHex, tagHex] = parts;
    const iv = Buffer.from(ivHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");
    const tag = Buffer.from(tagHex, "hex");
    const key = getKey();
    
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(tag);
    
    let decrypted = decipher.update(encrypted, undefined, "utf8");
    decrypted += decipher.final("utf8");
    
    return JSON.parse(decrypted) as SessionPayload;
  } catch (err) {
    console.error("Session decryption failed:", err);
    return null;
  }
}

export async function createSession(username: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const payload: SessionPayload = { username, expiresAt: expiresAt.toISOString() };
  const session = encrypt(payload);
  
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;
  
  const payload = decrypt(sessionCookie);
  if (!payload) return null;
  
  if (new Date(payload.expiresAt) < new Date()) {
    return null;
  }
  
  return payload;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
