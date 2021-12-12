import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginUser} from "../model/login.user";
import {DataRegistration} from "../model/data.registration";
import {WebSocketService} from "./web-socket.service";
import {LoginUserService} from "./login-user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private customHttpClient: HttpClient;
  loginUser!: LoginUser;

  constructor(
    private http: HttpClient,
    private router: Router,
    private backed: HttpBackend,
    private webSocketService: WebSocketService,
    private loginUserService: LoginUserService
  ) {
    this.customHttpClient = new HttpClient(backed);
  }

  signIn(credentials: any) {
    return this.http.post('api/login', {
      email: credentials.email,
      password: credentials.password
    }, {observe: 'response'})
      .subscribe(
        response => {
          const token = response.headers.get('authorization');
          if (token !== null) {
            localStorage.setItem('access_token', token.replace('Bearer ', ''));
            this.getUserData().subscribe(user => {
              this.loginUserService.loginUser = user
              this.loginUser = user;
              this.webSocketService.openWebSocket(token, user);

            });
            this.router.navigate(['dashboard']);

          }
        }
      )
  }

  signUp(dataRegistration: DataRegistration) {
    return this.customHttpClient.post('api/users', dataRegistration);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    return (token !== null);
  }

  logout() {
    const removeToken = localStorage.removeItem('access_token');
    // this.webSocketService.webSocket.
    this.webSocketService.disconnect();
    if (removeToken === null) {
      this.router.navigate(['login']);
    }
  }

  getUserData() {
    return this.http.get<LoginUser>('api/users');
  }

}
