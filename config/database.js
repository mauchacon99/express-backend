require('dotenv-safe').config({
    allowEmptyValues: true
})

module.exports = {
    // config db
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_DATABASE || "database_development",
    dialect: "mariadb",
    dialectOptions: {
        host: process.env.DB_HOST || "127.0.0.1",
    },

    // config seeds
    seederStorage: 'sequelize',
    seederStorageTableName: 'seeds',

    // config migrations
    migrationStorage: 'sequelize',
    migrationStorageTableName: 'migrations',
}
