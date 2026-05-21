import express from "express";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const users = [
  {
    id: 1,
    firstName: "Иван",
    lastName: "Иванов",
    phone: "+79991234567",
    email: "admin@mail.ru",
    role: "admin",
    password: "admin123",
  },
];

const nameRegex = /^[A-Za-zА-Яа-яЁёІіЇїЄє'-]{2,}$/;
const phoneRegex = /^\+?[0-9]{10,15}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.get("/api/data", (req, res) => {
  res.json({
    message: "Риск Ошеис",
    title: "Худи",
    price: 120,
  });й
});

app.post("/api/register", (req, res) => {
  const { firstName, lastName, phone, email, role, password } = req.body;

  if (!firstName || !lastName || !phone || !email || !role || !password) {
    return res.status(400).json({ message: "Заполните все поля." });
  }

  if (!nameRegex.test(String(firstName).trim())) {
    return res.status(400).json({ message: "Некорректное имя." });
  }

  if (!nameRegex.test(String(lastName).trim())) {
    return res.status(400).json({ message: "Некорректная фамилия." });
  }

  if (!phoneRegex.test(String(phone).trim())) {
    return res.status(400).json({ message: "Некорректный телефон." });
  }

  if (!emailRegex.test(String(email).trim().toLowerCase())) {
    return res.status(400).json({ message: "Некорректная почта." });
  }

  if (!["admin", "user"].includes(role)) {
    return res.status(400).json({ message: "Некорректная роль." });
  }

  if (String(password).length < 6) {
    return res
      .status(400)
      .json({ message: "Пароль должен быть не короче 6 символов." });
  }

  const existingUser = users.find(
    (user) => user.email === String(email).trim().toLowerCase()
  );

  if (existingUser) {
    return res
      .status(409)
      .json({ message: "Пользователь с такой почтой уже существует." });
  }

  const newUser = {
    id: users.length + 1,
    firstName: String(firstName).trim(),
    lastName: String(lastName).trim(),
    phone: String(phone).trim(),
    email: String(email).trim().toLowerCase(),
    role,
    password: String(password),
  };

  users.push(newUser);

  return res.status(201).json({
    message: "Пользователь зарегистрирован",
    user: {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      phone: newUser.phone,
      email: newUser.email,
      role: newUser.role,
    },
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Введите почту и пароль." });
  }

  const normalizedEmail = String(email).trim().toLowerCase();

  if (!emailRegex.test(normalizedEmail)) {
    return res.status(400).json({ message: "Некорректная почта." });
  }

  const user = users.find((item) => item.email === normalizedEmail);

  if (!user) {
    return res.status(404).json({ message: "Пользователь не найден." });
  }

  if (user.password !== String(password)) {
    return res.status(401).json({ message: "Неверный пароль." });
  }

  return res.json({
    message: "Вход выполнен успешно",
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      role: user.role,
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});