import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {FireService} from "../fire.service";

export function LoginGuard() {

  return () => {
    const router = inject(Router);
    const fireService = inject(FireService)

    if(fireService.auth.currentUser === null){
      fireService.sign_out()
      router.navigate(["/login"])
      return false
    }
    return true;
  }

}
