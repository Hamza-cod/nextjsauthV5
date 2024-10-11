import { auth } from "@/auth"

export default  async  function SttingsPage() {
 const session = await auth();
  return (
    <div>
     {JSON.stringify(session)}
     page</div>
  )
}
