import { useMemo, useState } from "react";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Text } from "../components/Text";

type LoginErrors = {
  email?: string;
  password?: string;
  server?: string;
  success?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const isSubmitDisabled = useMemo(() => {
    return !email.trim() || !password.trim() || isLoading;
  }, [email, password, isLoading]);

  const validate = () => {
    const nextErrors: LoginErrors = {};

    if (!emailRegex.test(email.trim())) {
      nextErrors.email = "Введите корректную почту.";
    }

    if (password.trim().length < 6) {
      nextErrors.password = "Пароль должен быть не короче 6 символов.";
    }

    return nextErrors;
  };

  const handleLogin = async () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrors({ server: result.message || "Ошибка входа." });
        return;
      }

      setErrors({
        success: `${result.message}. Роль: ${
          result.user.role === "admin" ? "админ" : "простой пользователь"
        }`,
      });
    } catch (error) {
      setErrors({ server: "Сервер недоступен." });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-100 px-4 py-12">
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-8">
          <Text type="h2">Вход в систему</Text>
          <Text type="p" className="mt-2">
            Введите почту и пароль от аккаунта.
          </Text>
        </div>

        <form
          className="mt-8 flex flex-col gap-5"
          onSubmit={(event) => {
            event.preventDefault();
            handleLogin();
          }}
        >
          <Input
            label="Электронная почта"
            name="email"
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setErrors((prev) => ({
                ...prev,
                email: "",
                server: "",
                success: "",
              }));
            }}
            error={errors.email}
          />

          <Input
            label="Пароль"
            name="password"
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setErrors((prev) => ({
                ...prev,
                password: "",
                server: "",
                success: "",
              }));
            }}
            error={errors.password}
          />

          {errors.server && (
            <p className="text-sm text-red-500">{errors.server}</p>
          )}
          {errors.success && (
            <p className="text-sm text-green-600">{errors.success}</p>
          )}

          <Button
            color="primary"
            size="middle"
            title={isLoading ? "Проверка..." : "Войти"}
            type="submit"
            disabled={isSubmitDisabled}
          />
        </form>
      </div>
    </section>
  );
};

export default Login;