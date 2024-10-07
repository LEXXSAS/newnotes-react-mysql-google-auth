Notes version two on mysql react and node js with google authauthentication and create note from txt file and create dump mysql

> [!WARNING]
>Before copying and start the project add your data in the file "db.js"
>replace 'your_password_for_db', 'your_password_for_db' and create in client and server folders .env file with replace on your google id google secret google uri redirect and db user db password with yours</br>
>```javascript
>host = 'localhost'; </br>
>user = 'your_username_for_db'; </br>
>password = 'your_password_for_db'; </br>
>database = 'newnotes'; </br>

> [!NOTE]
>Before start project
> create mysql db 'newnotes' with table 'notes', 'users', 'refresh'
>
>CREATE DATABASE `newnotes`;
>
> CREATE TABLE `notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `author` varchar(100) NOT NULL,
  `body` varchar(255) NOT NULL,
  `priority` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
>
>CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `active` enum('false','true') NOT NULL DEFAULT 'false',
  `agent` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
>
>CREATE TABLE `refresh` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) DEFAULT NULL,
  `userid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userid_idx` (`userid`),
  CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=896 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

> [!NOTE]
> To start the project you need to run:

#### On server folder
command "node init -y" and "node install"
after "npm start" for start server

#### On client folder
command "node init -y" and "node install"
after "npm run dev"

> [!WARNING]
> to download a file you need to use only text files written in three lines
>
> first line convert to 'title' </br>
> second line convert to 'author' </br>
> third line convert to 'body'
