import dotenv from "dotenv";

dotenv.config();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, MEMBER_ROLE_ID } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !MEMBER_ROLE_ID) {
  throw new Error("Missing environment variables");
}

export const Config = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  MEMBER_ROLE_ID
};