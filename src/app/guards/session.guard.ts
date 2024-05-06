import { inject } from "@angular/core"
import { Router } from "@angular/router"



export const SessionGuard = (): boolean => {
  const router = inject(Router)

  try{
    const token = localStorage.getItem('token')
    if(!token){
      router.navigate(['/login'])
    }
    return true
  }catch(e){
    console.log('Ocurrio un error en el guard',e)
    return false
  }

}
