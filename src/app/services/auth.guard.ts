import { LocalStorageService } from './local-storage.service';
import { ToastGlobalService } from 'src/app/services/toast-global.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: any;
  constructor( private router: Router,
              private toastService: ToastGlobalService,
              private localStorageService: LocalStorageService) {}
  async canActivate(){

    onAuthStateChanged(auth, (currentUser) => {

      try {
        this.user = currentUser.email;
      } catch (err) {
        console.log(err.message)
      }

    })

    if (this.user) {
      return true
    }

    this.router.navigate(['/login/'])
    this.toastService.presentToast("danger", "Usuario Não Authenticado")
    return false
  }
}
