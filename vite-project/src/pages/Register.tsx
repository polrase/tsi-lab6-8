import { useMemo, useState } from "react";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Text } from "../components/Text";

type RegisterForm = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: "admin" | "user";
  password: string;
  confirmPassword: string;
};

type RegisterErrors = Partial<
  Record<keyof RegisterForm | "server" | "success", string>
>;

const initialForm: RegisterForm = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  role: "user",
  password: "",
  confirmPassword: "",
};

const nameRegex = /^[A-Za-zА-Яа-яЁёІіЇїЄє'-]{2,}$/;
const phoneRegex = /^\+?[0-9]{10,15}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const [form, setForm] = useState<RegisterForm>(initialForm);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const isSubmitDisabled = useMemo(() => {
    return (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.phone.trim() ||
      !form.email.trim() ||
      !form.password.trim() ||
      !form.confirmPassword.trim() ||
      isLoading
    );
  }, [form, isLoading]);

  const handleChange = (field: keyof RegisterForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "", server: "", success: "" }));
  };

  const validate = () => {
    const nextErrors: RegisterErrors = {};

    if (!nameRegex.test(form.firstName.trim())) {
      nextErrors.firstName = "Имя должно содержать минимум 2 буквы.";
    }

    if (!nameRegex.test(form.lastName.trim())) {
      nextErrors.lastName = "Фамилия должна содержать минимум 2 буквы.";
    }

    if (!phoneRegex.test(form.phone.trim())) {
      nextErrors.phone = "Телефон: только цифры, от 10 до 15 символов.";
    }

    if (!emailRegex.test(form.email.trim())) {
      nextErrors.email = "Введите корректную почту.";
    }

    if (form.password.trim().length < 6) {
      nextErrors.password = "Пароль должен быть не короче 6 символов.";
    }

    if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Пароли не совпадают.";
    }

    return nextErrors;
  };

  const handleRegister = async () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim().toLowerCase(),
          role: form.role,
          password: form.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrors({ server: result.message || "Ошибка регистрации." });
        return;
      }

      setErrors({
        success: result.message || "Регистрация прошла успешно.",
      });
      setForm(initialForm);
    } catch (error) {
      setErrors({ server: "Сервер недоступен." });
      console.error("Register error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-100 px-4 py-12">
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-8">
          <Text type="h2">Регистрация</Text>
          <Text type="p" className="mt-2">
            Заполните форму для создания аккаунта.
          </Text>
        </div>

        <form
          className="mt-8 flex flex-col gap-5"
          onSubmit={(event) => {
            event.preventDefault();
            handleRegister();
          }}
        >
          <Input
            label="Имя"
            name="firstName"
            type="text"
            placeholder="Введите имя"
            value={form.firstName}
            onChange={(event) => handleChange("firstName", event.target.value)}
            error={errors.firstName}
          />

          <Input
            label="Фамилия"
            name="lastName"
            type="text"
            placeholder="Введите фамилию"
            value={form.lastName}
            onChange={(event) => handleChange("lastName", event.target.value)}
            error={errors.lastName}
          />

          <Input
            label="Телефон"
            name="phone"
            type="tel"
            placeholder="+79991234567"
            value={form.phone}
            onChange={(event) => handleChange("phone", event.target.value)}
            error={errors.phone}
          />

          <Input
            label="Электронная почта"
            name="email"
            type="email"
            placeholder="example@mail.com"
            value={form.email}
            onChange={(event) => handleChange("email", event.target.value)}
            error={errors.email}
          />

          <label className="flex w-full flex-col gap-2 text-sm font-medium text-slate-700">
            <span>Роль</span>
            <select
              name="role"
              value={form.role}
              onChange={(event) =>
                handleChange("role", event.target.value as "admin" | "user")
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="user">Простой пользователь</option>
              <option value="admin">Админ</option>
            </select>
          </label>

          <Input
            label="Пароль"
            name="password"
            type="password"
            placeholder="Введите пароль"
            value={form.password}
            onChange={(event) => handleChange("password", event.target.value)}
            error={errors.password}
          />

          <Input
            label="Повторите пароль"
            name="confirmPassword"
            type="password"
            placeholder="Повторите пароль"
            value={form.confirmPassword}
            onChange={(event) =>
              handleChange("confirmPassword", event.target.value)
            }
            error={errors.confirmPassword}
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
            title={isLoading ? "Отправка..." : "Зарегистрироваться"}
            type="submit"
            disabled={isSubmitDisabled}
          />
        </form>
      </div>
    </section>
  );
};

export default Register;