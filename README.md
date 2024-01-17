## Requirements to Run

- Node.js: Ensure that you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/). Latest LTS version should be fine.

## Getting Started

1. **Clone the Repository**: `git clone https://github.com/premithk/oneglass.git`
2. **Backend Setup**:
    - Navigate to the `backend/oneglass` folder.
    - Add a `.env` file in `backend/oneglass` with the db connection string. Example - `DATABASE_URL="postgresql://username:password@host:5432/postgres?schema=oneglass"`
    - Run `yarn` to install dependencies.
    - Run `yarn prisma generate` to generate the prisma client

    - Run `yarn start:dev` to start the NestJS app.
3. **Backend Setup**:
    - Navigate to the `frontend/oneglass` folder.
    - Run `yarn` to install dependencies.
    - Run `yarn dev` to start the Next App
