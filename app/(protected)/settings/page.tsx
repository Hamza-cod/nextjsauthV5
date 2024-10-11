import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button";

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
     <Button type="submit">
      logout
     </Button>
     </form>
     page</div>
  )
}
