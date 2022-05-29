-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: May 29, 2022 at 10:00 AM
-- Server version: 5.7.35
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `assignment`
--

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `leader_id` int(10) UNSIGNED DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `date_start` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `leader_id`, `subject`, `date_start`, `created_at`, `updated_at`) VALUES
(1, 'Typography', 11, 'None', '2022-11-11 06:00:00', '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(2, 'Web designers', 12, 'None', '2022-11-11 06:00:00', '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(3, 'Chemistry', 12, 'None', '2023-09-11 08:00:00', '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(4, 'Backmagicians', 12, 'None', '2022-11-11 06:00:00', '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(5, 'Blockchain', 11, 'None', '2022-11-11 06:00:00', '2022-05-29 10:00:23', '2022-05-29 10:00:23');

-- --------------------------------------------------------

--
-- Table structure for table `group_user`
--

CREATE TABLE `group_user` (
  `id` int(10) UNSIGNED NOT NULL,
  `group_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `group_user`
--

INSERT INTO `group_user` (`id`, `group_id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 4, 1, '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(2, 4, 2, '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(3, 3, 3, '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(4, 1, 4, '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(5, 2, 5, '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(6, 4, 6, '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(7, 3, 7, '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(8, 1, 8, '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(9, 4, 9, '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(10, 3, 10, '2022-05-29 10:00:23', '2022-05-29 10:00:23');

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20220527182014-createTableUser.js'),
('20220527182030-createTableGroup.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `avatar` varchar(100) NOT NULL,
  `sex` varchar(10) DEFAULT 'male',
  `birth_place` varchar(50) DEFAULT NULL,
  `birth_date` datetime DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `avatar`, `sex`, `birth_place`, `birth_date`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Join Doe', 'joindoest75@gmail.com', 'https://www.w3schools.com/w3images/avatar4.png', 'female', 'Vietnam', '1998-11-10 17:00:00', 'STUDENT', '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(2, 'Hoe Goo', 'hoegoost58@gmail.com', 'https://www.w3schools.com/w3images/avatar3.png', 'female', 'Vietnam', '1998-11-10 17:00:00', 'STUDENT', '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(3, 'Hely Haki', 'helyhakist50@gmail.com', 'https://www.w3schools.com/w3images/avatar3.png', 'female', 'Vietnam', '1998-11-10 17:00:00', 'STUDENT', '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(4, 'Hely Haki', 'helyhakist80@gmail.com', 'https://www.w3schools.com/w3images/avatar3.png', 'female', 'Vietnam', '1998-11-10 17:00:00', 'STUDENT', '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(5, 'Blackey Goo', 'blackeygoost98@gmail.com', 'https://www.w3schools.com/w3images/avatar3.png', 'female', 'Japan', '1992-03-10 17:00:00', 'STUDENT', '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(6, 'Bana Mada', 'banamadast93@gmail.com', 'https://www.w3schools.com/w3images/avatar5.png', 'female', 'Japan', '1992-03-10 17:00:00', 'STUDENT', '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(7, 'Hoe Mada', 'hoemadast17@gmail.com', 'https://www.w3schools.com/w3images/avatar4.png', 'female', 'Japan', '1998-11-10 17:00:00', 'STUDENT', '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(8, 'Join Mada', 'joinmadast88@gmail.com', 'https://www.w3schools.com/w3images/avatar4.png', 'female', 'Vietnam', '1998-11-10 17:00:00', 'STUDENT', '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(9, 'Bana Doe', 'banadoest34@gmail.com', 'https://www.w3schools.com/w3images/avatar5.png', 'female', 'Japan', '1992-03-10 17:00:00', 'STUDENT', '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(10, 'Hely Goo', 'helygoost74@gmail.com', 'https://www.w3schools.com/w3images/avatar1.png', 'female', 'China', '1998-11-10 17:00:00', 'STUDENT', '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(11, 'Bana Haki', 'banahakist30@gmail.com', 'https://www.w3schools.com/w3images/avatar1.png', 'female', 'Vietnam', '1998-11-10 17:00:00', 'LEADER', '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(12, 'Bana Doe', 'banadoest64@gmail.com', 'https://www.w3schools.com/w3images/avatar2.png', 'female', 'Vietnam', '1992-03-10 17:00:00', 'LEADER', '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(13, 'Bana Goo', 'banagoost66@gmail.com', 'https://www.w3schools.com/w3images/avatar3.png', 'female', 'Japan', '1998-11-10 17:00:00', 'LEADER', '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(14, 'Blackey Haki', 'blackeyhakist73@gmail.com', 'https://www.w3schools.com/w3images/avatar3.png', 'female', 'Japan', '1992-03-10 17:00:00', 'LEADER', '2022-05-29 10:00:23', '2022-05-29 10:00:23'),
(15, 'Bana Goo', 'banagoost84@gmail.com', 'https://www.w3schools.com/w3images/avatar1.png', 'female', 'China', '1998-11-10 17:00:00', 'LEADER', '2022-05-29 10:00:23', '2022-05-29 10:00:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `leader_id` (`leader_id`);

--
-- Indexes for table `group_user`
--
ALTER TABLE `group_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `group_user`
--
ALTER TABLE `group_user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`leader_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `group_user`
--
ALTER TABLE `group_user`
  ADD CONSTRAINT `group_user_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  ADD CONSTRAINT `group_user_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
