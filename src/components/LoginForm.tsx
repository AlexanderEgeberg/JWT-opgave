import { login } from "../apifacade";
import "./LoginForm.css";

export default function LoginForm({ onLogin }: { onLogin: () => void }) {
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    await login(username, password);
    onLogin();
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <label>
        Brugernavn
        <input name="username" required />
      </label>
      <label>
        Adgangskode
        <input name="password" type="password" required />
      </label>
      <button type="submit">Log ind</button>
    </form>
  );
}
