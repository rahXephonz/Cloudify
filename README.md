## Getting Started For Deployment App On Vercel

This Repo referencing by using vercel serverless [λ] functions
Which is im using graphql in this Repo and running on vercel server.
Firsting first create your online database using heroku postgres, digital ocean or etc.
And then run the development server on your local machine check all integrity is working fine
Also you can setup your database using docker.

```bash
npm run dev
# or
yarn dev
```

Then setting your .env variable for example i have a online database on heroku postgres

your .env maybe look like this

```env

#our database url in server for production
PROD_DATABASE_URL= this_is_databases_when_production

#ocreate your own database to development this apps
DATABASE_URL=postgres://postgres:your-password@localhost/name-of-apps

#node env
NODE_ENV=mode

#jwt secret
JWT_SECRET=your-key

```

and setup your env in vercel and redeploy again, finally check all integrity and make sure it was working fine.
