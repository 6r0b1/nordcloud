This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

After cloning repo create a postgres database "stationfinder"

$ touch .env
$ nano .env

Add to file:
DATABASE_URL="postgresql://[yourPostgresUser]:[yourPostgresPassword]@localhost:5432/stationfinder?schema=public"

$ npm install

$ npx prisma migrate dev

$ npm run build

$ npm start

You should now have the app running at localhost:3000
