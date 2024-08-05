<div align="center">
    <img src="./public/guilds-logo.png" alt="Guilds Logo" style="width: 40%;">
    <p style="margin-top:30px">The club directory website for the UIC Club Fair 2024</p>
    <a href="https://guilds.gdscuic.org">https://guilds.gdscuic.org</a>
</div>

## Club Submission
### For clubs
Please submit your information in this [Google Drive Link](https://drive.google.com/drive/folders/19EoFgGSuJfsHNwc1fVFyDkVWfpWneiqV?usp=sharing).

### For developers
Guilds uses real Markdown files (ending in `.md`) as the database for keeping club data. Here are the following things you can do to add your club:

1. Create a folder inside the `src/clubs` directory. Be sure that the name only contains lowercase alphabets, numbers, and only dashes. Dashes are used to substitute spaces in this case (`Club XYZ` -> `club-xyz`)
2. Inside the folder, create an `index.md` file. This is where most of your club's information be displayed. The following is the format:

```md
---
name: Club XYZ
description: Your #1 club!
---

# Pictures and other information goes here
```

3. Save and create a pull request.

## Development
The Guilds website is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributors
<a href="https://github.com/gdsc-uic/guilds/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=gdsc-uic/guilds" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

### (c) 2022 Google Developer Student Clubs of UIC