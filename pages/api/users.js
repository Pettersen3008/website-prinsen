import dbConnect from "../../lib/dbConnect";
import User from "../../models/users";

export default async function handler(req, res) {
  const { firstname, lastname, phone } = req.body;

  if (!firstname || !lastname || !phone) {
    res.status(400).json({
      title: "Prøv igjen",
      description: "Du må fylle inn alle feltene",
    });
    return;
  }
  // Connect to the database
  await dbConnect()
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      throw new Error(err);
    });

  const user = new User({
    firstname,
    lastname,
    phone,
  });

  try {
    await user.save();
    res.status(201).json({
      title: "Registrering vellykket",
      description: "Du er nå registrert",
    });
    return;
  } catch (err) {
    res
      .status(500)
      .json({ title: "Registrering feilet", description: err });
      return;
  }
}
