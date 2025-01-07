import AppDataSource from "@/utils/data-source";
import { User } from "@/entity/User";

export default async function handler(req, res) {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const userRepo = AppDataSource.getRepository(User);

  if (req.method === "GET") {
    const { email } = req.query;

    if (!email) {
      return res
        .status(400)
        .json({ exists: false, error: "Email is required" });
    }

    try {
      const user = await userRepo.findOne({ where: { email } });
      if (user) {
        return res.status(200).json({ exists: true });
      } else {
        return res.status(200).json({ exists: false });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ exists: false, error: "Internal Server Error" });
    }
  }

  if (req.method === "POST") {
    const { email, password, action } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    try {
      if (action === "register") {
        const existingUser = await userRepo.findOne({ where: { email } });
        if (existingUser) {
          return res.status(400).json({ error: "User already exists" });
        }

        const newUser = userRepo.create({ email, password });
        await userRepo.save(newUser);

        return res
          .status(201)
          .json({ message: "User registered successfully", user: newUser });
      } else if (action === "login") {
        const user = await userRepo.findOne({ where: { email, password } });
        if (user) {
          return res.status(200).json({ message: "Login successful", user });
        } else {
          return res.status(401).json({ error: "Invalid email or password" });
        }
      } else {
        return res.status(400).json({ error: "Invalid action specified" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
