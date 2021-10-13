module.exports = Object.freeze({
  database: {
    url: process.env.MPAMPE_MONGODB_SERVER || "mongodb://localhost",
    name: process.env.DATABASE_NAME || "mpa-mpe",
    connectRetry: 5,
  },
  SECRET_KEY: "dsW7UoHqhl1FnQJmXm75NgpGb8243z7s",
  DEFAULT_ADMIN: {
    USERNAME: "admin",
    PASSWORD: "admin",
  },
});
