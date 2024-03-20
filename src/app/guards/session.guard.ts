import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { CookieService } from "ngx-cookie-service"



export const SessionGuard = (): boolean => {
  const cookieService=  inject(CookieService)
  const router = inject(Router)

  try{
    const token = cookieService.check('token')
    if(!token){
      router.navigate(['/login'])
    }
    return token
  }catch(e){
    console.log('Ocurrio un error en el guard',e)
    return false
  }

}
