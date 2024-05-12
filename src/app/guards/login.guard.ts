import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { TOKEN } from "../const/localStorageConst"



export const LoginGuard = (): boolean => {
  const router = inject(Router)

  try{
    const token = localStorage.getItem(TOKEN)
    if(token){
      router.navigate(['/home'])
    }
    return true
  }catch(e){
    console.log('Ocurrio un error en el guard',e)
    return false
  }

}
