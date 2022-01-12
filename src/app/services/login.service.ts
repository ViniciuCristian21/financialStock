import { ToastGlobalService } from './toast-global.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Login } from '../entities/login';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  uId: string;
  constructor(private router: Router,
              private toastService: ToastGlobalService) { }

  async registerUser() {}

  async login(login: Login){
    const { email, password } = login;
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      this.uId = user.user.uid;
      if (user) {
        this.router.navigate(['/dashboard/']);
      }
      console.log(user.user.uid)
    } catch (err) {
      this.toastService.presentToast("danger", "Email ou Senha incorreta");
    }
  }

  async logout() {
    await signOut(auth);

    this.router.navigate(['/login/']);
  }
}
