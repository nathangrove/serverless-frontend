export class User {
  _id: string;
  username: string;
  admin: boolean;
  created: Date;
  active: boolean;
  password: string;

  constructor(
    id: string = '',
    username: string = '',
    active: boolean = false,
    created: number = new Date().getTime(),
    admin: boolean = false
  ){
    this._id = id;
    this.username = username;
    this.admin = admin;
    this.created = new Date(created);
    this.active = active;
  }


  toSaveObject(){
    let user: any = {};
    user.username = this.username;
    if (this.password) user.password = this.password;
    user.active = this.active;
    user.admin = this.admin;
    return user; 
  }
  
}
