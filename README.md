<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/kokolopo/Food-Recipe-API">
    <img src="https://lh3.googleusercontent.com/d/1AuO1tJ469WqoXQufUeR-OkzqAW258aXT" alt="Logo" width="150px">
  </a>

  <h3 align="center">Mama Recipe</h3>

  <p align="center">
    Discover Recipe & Delicious Food.
    <br />
    <a href="#table-of-contents"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://bit.ly/Food-Recipe-API">View Demo</a>
    ·
    <a href="https://github.com/kokolopo/Food-Recipe-API/issues">Report Bug</a>
    ·
    <a href="https://github.com/kokolopo/Food-Recipe-API/issues">Request Feature</a>
    <br />
    <p align="center">
      <a href="https://github.com/kokolopo/Food-Recipe-API/"><img src="https://img.shields.io/github/issues/kokolopo/Food-Recipe-API?style=flat"></a>
      <a href="https://github.com/kokolopo/Food-Recipe-API/"><img src="https://img.shields.io/github/forks/kokolopo/Food-Recipe-API?style=flat"></a>
      <a href="https://github.com/kokolopo/Food-Recipe-API/"><img src="https://img.shields.io/github/stars/kokolopo/Food-Recipe-API?style=flat"></a>
      <a href="https://github.com/kokolopo/Food-Recipe-API/"><img src="https://img.shields.io/github/license/kokolopo/Food-Recipe-API?style=flat"></a>
    </p>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
 ## Table of Contents

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#setup-env-example">Setup .env example</a></li>
      </ul>
    </li>
    <li><a href="#screenshoots">Screenshots</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#related-project">Related Project</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project
**Mama Recipe** is here to help you cook delicious and simple meals. We offer recipes and cooking advice for home cooks, by home cooks. Mama Recipe is a web-based recipe sharing that applicaion that allow user to share their recipe, liked, and comment. Just like social media. In this app, user could take a look into recipe including it's ingredients and video step.

### Built With
This app was built with some technologies below:
* [NodeJS](https://nodejs.org/en)
* [expressJS](https://expressjs.com/)
* [JWT](https://jwt.io/)
* [Minio](https://min.io/docs/minio/linux/developers/javascript/API.html)
* [Multer](https://www.npmjs.com/package/multer)
* [Mailjet](https://www.mailjet.com/)
* [Postgresql](https://www.postgresql.org/)
* [Redis](https://redis.io/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Before going to the installation stage there are some software that must be installed first.

* [NodeJs](https://nodejs.org/en/download/)

<p align="right">(<a href="#top">back to top</a>)</p>

### Installation

If you want to run this project locally, We recommend you to configure the [front-end](https://github.com/kokolopo/food-recipes).
- Clone the repo
```
git clone https://github.com/kokolopo/Food-Recipe-API.git
```
- Go To Folder Repo
```
cd Food-Recipe-API
```
- Install Module
```
npm install
```
- <a href="#setup-env">Setup .env</a>
- Type ` npm run start` To run aplications

<p align="right">(<a href="#top">back to top</a>)</p>

### Setup .env example
Create .env file in your root project folder.
```
POSTGRESQL_HOST = [HOST]
POSTGRESQL_USER = [USERNAME]
POSTGRESQL_PASSWORD = [PASSWORD]
POSTGRESQL_DATABASE = [DATABASE]
POSTGRESQL_PORT = [PORT]

ACCESS_TOKEN = [ACCESS_TOKEN]
REFRESH_TOKEN = [REFRESH_TOKEN]

MAILJET_API_KEY = [MAILJET_API_KEY]
MAILJET_SECRET_KEY = [MAILJET_SECRET_KEY]

S3_ENDPOINT = [S3_ENDPOINT]
S3_ACCESS_KEY = [S3_ACCESS_KEY]
S3_SECRET_KEY = [S3_SECRET_KEY]
```

<p align="right">(<a href="#top">back to top</a>)</p>

## API Documentation

[Documentation](/Food%20Recipes%20API.postman_collection.json)
      
</p>

<p align="right">(<a href="#top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

## Related Project
:rocket: [`Backend Mama Recipe`](https://github.com/kokolopo/Food-Recipe-API)

:rocket: [`Frontend Mama Recipe`](https://github.com/kokolopo/Food-Recipe-API)

<!-- :rocket: [`Web Service`](https://mama-recipe.herokuapp.com/) -->

:rocket: [`Demo Mama Recipe`](https://Food-Recipe-API-teal.vercel.app/)

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

My Email : hadifah3@gmail.com

Project Link: [https://github.com/kokolopo/Food-Recipe-API](https://github.com/kokolopo/Food-Recipe-API)

<p align="right">(<a href="#top">back to top</a>)</p>

## License
Distributed under the [MIT](/LICENSE) License.

<p align="right">(<a href="#top">back to top</a>)</p>