import { client } from "@repo/db/client";

export default async function Home() {
  try {
    const users = await client.user.findFirst();
    return (
      <div>
        {users?.username}
        {users?.password}
      </div>
    )
  } catch (e: any) {
    return (
      <pre style={{color: 'red', whiteSpace: 'pre-wrap'}}>
        {JSON.stringify(e, Object.getOwnPropertyNames(e), 2)}
      </pre>
    )
  }
}
