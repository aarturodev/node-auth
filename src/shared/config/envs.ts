process.loadEnvFile();

const getRequired = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Enviroment variable ${name} is required`);

  return value;
};

export const envs = {
  PORT: Number(process.env.PORT ?? 3000),
  MONGO_URI: getRequired("MONGO_URI"),
  MONGO_DB_NAME: getRequired("MONGO_DB_NAME"),
  JWT_SECRET: getRequired("JWT_SECRET"),
};
