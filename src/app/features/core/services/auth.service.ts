import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {auth} from "firebase";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState
      .pipe(
        switchMap(user=> {
          if(!user) {
            return of(null);
          } else {
            return '13';
          }
        })
      )
  }


  async signInGoogle() {
    try {
      await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
      await this.router.navigate(['/editor']);
    } catch (error) {
      throw error(error.code);
    }
  }

  async signOut() {
    try {
      await this.afAuth.signOut();
      await this.router.navigate(['/auth']);
    } catch (error) {
      throw error(error.code);
    }
  }

}
