import AppDataSource from "@/utils/data-source";
import { Favorite } from "@/entity/Favorite";

export default async function handler(req, res) {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const favoriteRepo = AppDataSource.getRepository(Favorite);

  if (req.method === "POST") {
    const { email, cityId } = req.body;

    try {
      let existingUser = await favoriteRepo.findOne({ where: { email } });

      if (!existingUser) {
        const newUser = favoriteRepo.create({
          email,
          cities: [cityId],
        });
        await favoriteRepo.save(newUser);
        return res.status(201).json({
          message: "City succesfully added to the newly created user",
        });
      } else {
        if (!existingUser.cities.includes(String(cityId))) {
          existingUser.cities.push(cityId);
        } else {
          existingUser.cities = existingUser.cities.filter(
            (id) => id !== String(cityId)
          );
        }
        await favoriteRepo.save(existingUser);
        return res.status(201).json({ message: "City added succesfully" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
