# 🏠 Real estate data extraction and visualization 📶
<p>
  <a href="https://nodejs.org/en/" target="_blank">
    <img
      src="https://img.shields.io/badge/-v16.16.0-gray?style=flat&logo=node.js&logoColor=white&label=Node.js&labelColor=43853D"
      alt="Node Js"
    />
  </a>
  <a href="https://www.npmjs.com/" target="_blank">
    <img
      src="https://img.shields.io/badge/-v8.11.0-gray?style=flat&logo=npm&label=npm&labelColor=cb0000"
      alt="Npm"
    />
  </a>
  <a href="https://nestjs.com/" target="_blank">
    <img
      src="https://img.shields.io/badge/-v8.0-gray?style=flat&logo=NestJS&logoColor=white&label=NestJs&labelColor=e0234e"
      alt="Nest JS"
    />
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img
      src="https://img.shields.io/badge/-v4.3.5-gray?style=flat&logo=TypeScript&logoColor=white&label=TypeScript&labelColor=3178c6"
      alt="TypeScript"
    />
  </a>
  <a href="https://pptr.dev/" target="_blank">
    <img
      src="https://img.shields.io/badge/-v16.2.0-gray?style=flat&logo=Puppeteer&logoColor=white&label=Puppeteer&labelColor=00d7a1"
      alt="Puppeteer"
    />
  </a>
  <a href="https://typeorm.io/" target="_blank">
    <img
      src="https://img.shields.io/badge/-v0.3.9-gray?style=flat&logo=orm&logoColor=white&label=TypeORM&labelColor=e83524"
      alt="TypeORM"
    />
  </a>
  <a href="https://ubuntu.com/" target="_blank">
    <img
      src="https://img.shields.io/badge/v22.04.1-gray?style=flat&logo=ubuntu&logoColor=white&label=Ubuntu&labelColor=e95420"
      alt="Ubuntu"
    />
  </a>
  <a href="https://www.docker.com/" target="_blank">
    <img
      src="https://img.shields.io/badge/v20.10.17-gray?style=flat&logo=docker&logoColor=white&label=Docker&labelColor=46a2f1"
      alt="Docker"
    />
  </a>
  <a href="https://www.postgresql.org/" target="_blank">
    <img
      src="https://img.shields.io/badge/v14.5-gray?style=flat&logo=postgresql&logoColor=white&label=postgres&labelColor=32658e"
      alt="Postgres"
    />
  </a>
</p>

# BackEnd
Follow the steps below to install the project

## 1. Installation
```bash
$ npm install
```

## 2. PostgreSQL installation by docker command 🐘
For the installation of the database we used ubuntu operating system.
```docker
$ sudo docker pull postgres:14.5
```
```docker
$ sudo docker create -p5432:5432 --name postgresql -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=mydb postgres:14.5
```
```docker
$ sudo docker start postgresql
```

## 3. Generate migration file
```bash
$ npm run migration:generate
```

## 4. Execution of migration to create tables in database
```bash
$ npm run migration:run
```

## 5. build the project
```bash
$ npm run build
```

## 6. Creation of triggers, functions and view
```bash
$ npm run proccessDB
```

## 7. Data web scraping 
```bash
$ npm run scraping
```

## 8. insert all data extracted in database
```bash
$ npm run bulkdata
```

## Example result
```json
{
  "price": "$ 59.000",
  "expense": "$ 10.200",
  "published": "Publicado hace 2 días",
  "views": "229 visualizaciones",
  "address": "***",
  "featureDept": [
    "70 m² Total",
    "30 m² Cubierta",
    "1 Ambiente"
  ],
  "featureGral": [
    "Parrilla",
    "Cocina",
    "Living comedor"
  ],
  "linkMap": "***",
  "linkBase": "***",
  "linkDepto": "***",
  "createDttm": "2022-09-17T16:22:02.864Z"
}
```
