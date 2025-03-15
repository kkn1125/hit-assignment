-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: hit_restaurant
-- ------------------------------------------------------
-- Server version	5.5.5-10.3.13-MariaDB-1:10.3.13+maria~bionic

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `restaurant_id` int(11) NOT NULL,
  `category` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `price` int(10) unsigned NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a9c5473205703022c7a53a410c2` (`restaurant_id`),
  CONSTRAINT `FK_a9c5473205703022c7a53a410c2` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,1,'main','런치 코스',25000,'츠마미 or 숙성회 아에모노, 시그니처 마끼 or 고등어봉초밥, 멘치카츠 치즈버거, 선택 1 단품 시스 (못 드시는 음식이 있으시면, 다른 메뉴로 변경해드립니다.)','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(2,1,'main','디너 코스',35000,'츠마미, 방어회, ','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(3,1,'side','구운 전복',35000,'버터와 간장으로 구운 전복, 깊은 감칠맛이 특징.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(4,1,'side','와규 타다끼',48000,'겉만 살짝 익혀 풍미를 살린 와규 타다끼, 트러플 소스와 함께 제공.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(5,1,'side','제철 해산물 찜',32000,'신선한 해산물을 쪄서 자연 그대로의 맛을 살린 요리.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(6,1,'side','일본식 계란찜 (차왕무시)',18000,'부드러운 일본식 계란찜, 대합과 다시마 육수의 깊은 맛이 어우러짐.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(7,1,'side','트러플 우니(성게) 덮밥',52000,'신선한 우니와 트러플이 어우러진 럭셔리한 미니 덮밥.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(8,1,'soup','미소된장국',8000,'구운 두부와 다시마 육수를 사용한 깊은 맛의 미소된장국.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(9,1,'soup','트러플 도미탕',38000,'트러플과 도미를 사용하여 깊은 향과 감칠맛을 살린 특별한 국물 요리.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(10,1,'dessert','말차 티라미수',20000,'말차의 쌉싸름한 맛과 크리미한 마스카포네 치즈가 어우러진 일본식 티라미수.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(11,1,'dessert','유자 셔벗',15000,'상큼한 유자의 향을 살린 시원한 셔벗 디저트.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(12,1,'dessert','흑임자 아이스크림',18000,'고소한 흑임자를 활용한 부드러운 일본식 아이스크림.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(13,1,'beverage','사케 페어링',60000,'각 코스에 어울리는 사케를 소믈리에가 직접 페어링하여 제공.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(14,2,'main','트러플 인퓨전 한우 스테이크',180000,'숙성된 한우 안심을 트러플 오일로 마리네이드하고 저온 조리한 스테이크, 블랙 트러플 소스와 함께 제공.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(15,2,'main','벨루가 캐비어를 곁들인 참돔 카르파초',150000,'신선한 참돔을 얇게 저민 후 벨루가 캐비어와 감귤 비네그레트 소스로 마무리한 정제된 요리.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(16,2,'main','프렌치 오마카세 디너 코스',280000,'셰프가 엄선한 제철 식재료로 구성된 프랑스식 풀코스 오마카세.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(17,2,'main','랍스터 비스크와 수비드 가리비',170000,'랍스터 껍질을 우려낸 진한 비스크와 수비드한 가리비를 곁들인 해산물 요리.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(18,2,'main','와규 숯불구이와 레드와인 소스',190000,'A5 등급 와규를 숯불에서 구워 레드와인 소스와 감자 퓨레를 곁들인 고급 요리.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(19,2,'side','포르치니 머쉬룸 리조또',75000,'포르치니 버섯과 트러플을 사용한 깊은 풍미의 크리미한 리조또.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(20,2,'side','감태와 우니(성게) 브루스케타',90000,'바삭한 브루스케타 위에 감태와 신선한 우니를 얹어 고급스러운 감칠맛을 살린 요리.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(21,2,'side','이베리코 하몽과 무화과',82000,'숙성된 이베리코 하몽과 신선한 무화과를 곁들인 고급 전채 요리.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(22,2,'side','트러플 버터를 곁들인 수제 바게트',65000,'프랑스산 트러플 버터를 곁들인 갓 구운 수제 바게트.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(23,2,'side','양갈비 크러스트와 허브 소스',120000,'허브와 파르메산 치즈 크러스트를 입힌 양갈비, 레드와인 소스와 함께 제공.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(24,2,'soup','송로버섯 콘소메',85000,'블랙 트러플과 가리비를 곁들인 클리어 콘소메 스프.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(25,2,'soup','프렌치 어니언 스프',68000,'오랜 시간 카라멜라이즈한 양파와 깊은 육수, 그뤼에르 치즈를 얹어 구운 정통 프렌치 스프.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(26,2,'soup','랍스터 콘소메와 캐비어',110000,'진한 랍스터 육수로 만든 콘소메에 캐비어를 곁들여 감칠맛을 극대화한 수프.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(27,2,'dessert','바닐라 빈 크렘 브륄레',50000,'마다가스카르산 바닐라 빈을 사용한 부드럽고 고급스러운 크렘 브륄레.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(28,2,'dessert','루비 초콜릿 무스',62000,'진귀한 루비 초콜릿을 활용한 가벼운 무스 디저트.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(29,2,'dessert','유자 마카롱',45000,'프랑스식 마카롱과 상큼한 유자 크림의 조화.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(30,2,'beverage','도멘 르로와 샴페인 페어링',220000,'최고급 샴페인을 각 코스에 맞춰 제공하는 페어링 옵션.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(31,2,'beverage','프리미엄 바쇼 말차',50000,'일본 바쇼 농장의 최상급 말차를 사용한 고급 차 음료.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL),(32,2,'beverage','프랑스산 레드와인 샤또 마고',350000,'보르도 지역 최고급 레드와인 샤또 마고, 와인 페어링에 적합.','2025-03-15 16:08:21.043971','2025-03-15 16:08:21.043971',NULL);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1741439368275,'Migration1741439368275');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `reserve_start_at` datetime NOT NULL,
  `reserve_end_at` datetime NOT NULL,
  `phone` varchar(13) COLLATE utf8mb4_bin NOT NULL,
  `amount` int(10) unsigned NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e219b0a4ff01b85072bfadf3fd7` (`user_id`),
  KEY `FK_b8e66a59e3500c7a85cde4fb020` (`restaurant_id`),
  CONSTRAINT `FK_b8e66a59e3500c7a85cde4fb020` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_e219b0a4ff01b85072bfadf3fd7` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation_menu`
--

DROP TABLE IF EXISTS `reservation_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_id` int(11) NOT NULL,
  `reservation_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_b66dd4ce900f2bf37c45a62280c` (`reservation_id`),
  KEY `FK_0b44b69da5e8c609348ef20d652` (`menu_id`),
  CONSTRAINT `FK_0b44b69da5e8c609348ef20d652` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_b66dd4ce900f2bf37c45a62280c` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation_menu`
--

LOCK TABLES `reservation_menu` WRITE;
/*!40000 ALTER TABLE `reservation_menu` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservation_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `category` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `location` varchar(200) COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_aefad5ba2f054d4bbc415b3ef2a` (`user_id`),
  CONSTRAINT `FK_aefad5ba2f054d4bbc415b3ef2a` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
INSERT INTO `restaurant` VALUES (1,4,'omakase','스시오마주','울산광역시 남구 삼산중로00번길 0-00','2025-03-15 16:08:21.035387','2025-03-15 16:08:21.035387',NULL),(2,5,'fine dining','메종 드 레브','서울특별시 서초구 효령로00길 00','2025-03-15 16:08:21.035387','2025-03-15 16:08:21.035387',NULL);
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `role` int(10) unsigned NOT NULL,
  `phone` varchar(13) COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_758b8ce7c18b9d347461b30228` (`user_id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`),
  UNIQUE KEY `IDX_8e1f623798118e629b46a9e629` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'tomastrain1','tomastrain1@example.com','김영호','x0iT5AcmiGWzjYDPHvVjyu/WDzcR/Z002pBG4JH4DNI=',1,'010-1234-5678','2025-03-15 16:08:21.029706','2025-03-15 16:55:21.000000',NULL),(2,'matjung1221','matyoujung@example.com','최유정','3ND/MGcShXQP/ePXQG2EGVkfPNbCpd7QzPFl5NV3PGs=',1,'010-2589-3562','2025-03-15 16:08:21.029706','2025-03-15 16:55:56.000000',NULL),(3,'resting0301','matzip@example.com','구승용','0IlQaLh9GLEzFYJJ8xsxQLnkFzcaaXU2tIbsIBoEExI=',1,'010-9562-4253','2025-03-15 16:08:21.029706','2025-03-15 16:55:59.000000',NULL),(4,'sushiryu0423','ryu0423@example.com','류정열','E7bjB9HcnoU0SBeyPx30IpQUXuihtpw84tQDO9k3hZ8=',2,'010-5132-9584','2025-03-15 16:08:21.029706','2025-03-15 16:56:01.000000',NULL),(5,'imfinedining','dining-fore0306@example.com','이승재','Kd8QDTYYS3uZqG/Ah351+kgdq7P43Y8ZvFjY94M/d9o=',2,'010-8261-0021','2025-03-15 16:08:21.029706','2025-03-15 16:56:05.000000',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-16  4:09:29
