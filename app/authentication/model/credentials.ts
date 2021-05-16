
export interface UserDetails {
  name: string;

 email:  string;
  password: string;
  role: string;
  phone:number
}





export interface TokenDetails {
  duration: number;
  token: string;
}

export class RegisterDetails implements UserDetails {
  constructor(public name: string,public email: string,   public password: string, public role: string, public phone: number) {}
  //Type is hard coded as user - otherwise registration doesn't work
  // constructor(public email: string, public username: string, private password: string, private password2: string, public type: string) {}

}

export class Credentials {
  constructor(public email: string, public password: string) {}

  get basicAuth(): string {
    return 'Basic ' + btoa(this.email + ':' + this.password);
  }
}
