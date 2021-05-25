export class User {

  static fromFirebase({ uid, name, email, dateCreate }) {
    return new User(uid, name, email, dateCreate)
  }

  constructor(
    public uid: string,
    public name: string,
    public email: string,
    public dateCreate: Date
  ) {
  }
}
