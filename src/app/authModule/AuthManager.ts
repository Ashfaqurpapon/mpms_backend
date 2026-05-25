class AuthManager {
  private static instance: AuthManager;
  private isAuthenticated: boolean = false;

  private constructor() {}

  public static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  public login(username: string, password: string): boolean {
    // Simulate authentication logic
    if (username === 'admin' && password === 'password') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  public logout(): void {
    this.isAuthenticated = false;
  }

  public checkAuth(): boolean {
    return this.isAuthenticated;
  }
}

export default AuthManager;
