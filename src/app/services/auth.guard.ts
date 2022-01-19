import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { collection, query, where, getDocs } from '@firebase/firestore';
import { db } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userCollectionRef = collection(db, "users");
  getUserId: any[] = [];

  constructor(private loginService: LoginService,
              private router: Router) {}
  async canActivate(){

    const result = query(this.userCollectionRef, where("cargo", "==", "admin"));
    const snap = await getDocs(result);
    const id = this.loginService.uId;
    const d = snap.docs.filter(doc => doc.id === id && doc.data().cargo === "admin")

    if (d.length === 0) {

      return false
    }

    return true
  }
}
