# Api

Run `npm install` to install dependencies.

Config your database and create `.env`

### Scripts

#### Production:

Run migrations `npm run migrate` create tables in db.

Run start server `npm run start` init server

#### Development:

Run `npm run fulldb` to create tables in db and insert seeds
or `npm run migrate` and `npm run seed`

Run in development `npm run dev` init server.

Run in production `npm run prod` init server.

If you want to clean the db and create everything again run `npm run fresh`

## Documentation

Endpoints Documentation with swagger
`http://localhost:3000/api-docs`
