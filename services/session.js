import nextSession from "next-session";
export const getSession = nextSession({ autoCommit: true });

export default async function handler(req, res) {
  const session = await getSession(req, res);
  console.log(session)
}