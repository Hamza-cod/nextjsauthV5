import { auth, signOut } from "@/auth"
export default  async  function SttingsPage() {
 const session = await auth();
  return (
    <div>
     {JSON.stringify(session)}
     <br/>
     <form action={
       async ()=>{
        "use server";
        await signOut()
      }
     }>
     <button type="submit">
      logout
     </button>
     </form>
     page</div>
  )
}
