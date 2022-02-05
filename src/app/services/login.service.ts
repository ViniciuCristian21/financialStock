import { Users } from './../entities/users';
import { ToastGlobalService } from './toast-global.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Login } from '../entities/login';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from 'src/environments/environment';
import { collection, setDoc, doc } from '@firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  uId: string;
  userCollectionRef = collection(db, "users");
  constructor(private router: Router,
              private toastService: ToastGlobalService) { }

  async registerUser(u: Users) {
    const { name, cargo, email, password } = u;

    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      this.uId = user.user.uid;
    } catch (err) {
      console.log(err.message)
    }

    if (this.uId) {
      await setDoc(doc(this.userCollectionRef, this.uId), {
        name: name,
        cargo: cargo
      });

      this.router.navigate(['/dashboard/']);
    }
  }

  async login(login: Login){
    const { email, password } = login;
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (!this.uId) {
        this.uId = user.user.uid;
      }
      if (user) {
        this.router.navigate(['/dashboard/']);
      }
      // console.log(user.user.uid)
    } catch (err) {
      this.toastService.presentToast("danger", "Email ou Senha incorreta");
    }
  }

  async logout() {
    await signOut(auth);

    this.router.navigate(['/login/']);
  }
}
