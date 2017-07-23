export class Call {
  _id: string;
  runs: number;
  crashes: number;
  last: Date;
  created: Date;
  name: string;
  active: boolean;
  code: string;
  encryptedCode: string;

  constructor(
    _id: string = '',
    runs: number = 0,
    crashes: number = 0,
    last: number = 0,
    created: number = new Date().getTime(),
    active: boolean = true,
    name: string = '',
    code: string = ''
  ){
    this._id = _id;
    this.runs = runs;
    this.crashes = crashes;
    this.last = new Date(last);
    this.created = new Date(created);
    this.active = active;
    this.name = name;
    this.code = code;
  }

  /**
   * turn a call into a savable object
   */
  toSaveObject(){
    let copy: any = {};
    if (this.code != '') copy.code = this.code;
    copy.name = this.name;
    copy.active = this.active;
    return copy;
  }

}
