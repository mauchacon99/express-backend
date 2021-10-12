# Api

Run `npm install` to install dependencies.

Config your database and create `.env`

### Scripts

#### Production:

Run `npm run fulldb` to create tables in db and insert seeds
or `npm run migrate` and `npm run seed`

Run start server `npm run start` init server

#### Development:

Run `npm run fulldb` to create tables in db and insert seeds
or `npm run migrate` and `npm run seed`

Run in development `npm run dev` init server.

Run in production `npm run prod` init server.

If you want to clean the db and create everything again run `npm run fresh`

### Tests
Run tests `npm run test`

## Documentation

### Users access

Role admin
```json
{ 
    "email": "admin@admin.com",
    "password": "123456"
}
```

Role coach
```json
{ 
    "email": "coach@coach.com",
    "password": "123456"
}
```

```json
{ 
    "email": "coach1@coach.com",
    "password": "123456"
}
```

```json
{ 
    "email": "coach2@coach.com",
    "password": "123456"
}
```

```json
{ 
    "email": "coach3@coach.com",
    "password": "123456"
}
```

Role vendor
```json
{ 
    "email": "vendor@vendor.com",
    "password": "123456"
}
```

Role company
```json
{ 
    "email": "company@company.com",
    "password": "123456"
}
```

Role personal
```json
{ 
    "email": "personal@personal.com",
    "password": "123456"
}
```

Endpoints Documentation with swagger
`http://localhost:3000/api-docs`
