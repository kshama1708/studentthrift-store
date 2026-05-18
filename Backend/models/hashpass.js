import bcrypt from "bcryptjs";

const run = async () => {
  const hash =
    await bcrypt.hash(
      "1234567",
      12
    );

  console.log(hash);
};

run();