import { Injectable } from '@angular/core';
import { tokenNotExpired} from 'angular2-jwt';
import { options } from '../auth.options';

declare var Auth0Lock: any;

@Injectable()
export class Auth {
    // Configure Auth0
    lock = new Auth0Lock('wthnmB82geGhLByt8NO1XXpkryWRQJmy','rocksta.auth0.com',options);

  constructor(){
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult:any) => {
      this.lock.getProfile(authResult.idToken, (error:any, profile:any) => {
        if(error){
          throw new Error(error);
        }

        // Set Profile
        localStorage.setItem('profile', JSON.stringify(profile));
        // Set Token
        localStorage.setItem('id_token', authResult.idToken);
      })

    });
  }

  public login() {
   // Call the show method to display the widget.
   this.lock.show();
  };

  public authenticated(){
    return tokenNotExpired();
  }

  public logout() {
   // Remove info from localStorage
   localStorage.removeItem('profile');
   localStorage.removeItem('id_token');
  };

}
