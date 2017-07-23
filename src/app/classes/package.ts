export class Pkg {
  _id: string;
  name: string;
  version: string;
  created: Date;

  constructor(
    id: string = '',
    name: string = '',
    version: string = '',
    created: number = new Date().getTime()
  ){
    this._id = id;
    this.name = name;
    this.version = version;
    this.created = new Date(created);
  }


  toSaveObject(){
    let pkg: any = {};
    pkg.name = this.name;
    pkg.version = this.version;
    return pkg;
  }

}
