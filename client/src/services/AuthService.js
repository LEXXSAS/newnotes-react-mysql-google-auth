import $api from "../http";

export default class AuthService {
  static async login() {
    return $api.post('/authtwo/')
  }
}
