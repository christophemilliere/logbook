const DATABASE_URL_PRODUCTION = process.env.DATABASE_URL;
const DATABASE_URL_DEV = "mysql://root:root@127.0.0.1:3306/logBookApi";

let configEnv = [
  {
    production: {
      url: DATABASE_URL_PRODUCTION,
      database: "tictactiv",
      entities: ["build/entity/*.js"],
      migrations: ["build/migration/*.js"],
      subscribers: ["build/subscriber/**/*.js"]
    },
    development: {
      url: DATABASE_URL_DEV,
      database: "logBookApi",
      entities: ["src/entity/*.ts"],
      migrations: ["src/migration/*.ts"],
      subscribers: ["src/subscriber/*.ts"]
    }
  }
];

const config =
  process.env.NODE_ENV === "production"
    ? configEnv[0]["production"]
    : configEnv[0]["development"];
let base = {
  type: "mysql",
  url: DATABASE_URL_DEV,
  synchronize: false,
  logging: true,
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber"
  }
};
module.exports = {
  ...base,
  ...config
};
