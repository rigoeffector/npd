-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Sep 14, 2023 at 09:14 PM
-- Server version: 5.7.39
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `npd`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL DEFAULT 'admin',
  `password` varchar(255) NOT NULL DEFAULT 'admin@123',
  `role` varchar(255) NOT NULL DEFAULT 'super'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `role`) VALUES
(1, 'admin', 'admin@123', 'super'),
(2, 'admin', 'admin@123', 'super');

-- --------------------------------------------------------

--
-- Table structure for table `assign`
--

CREATE TABLE `assign` (
  `id` int(11) NOT NULL,
  `employeeId` int(11) NOT NULL,
  `projectId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `assign`
--

INSERT INTO `assign` (`id`, `employeeId`, `projectId`) VALUES
(1, 12, 6);

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `projectId` int(11) NOT NULL,
  `employeeId` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(255) NOT NULL DEFAULT 'present'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `projectId`, `employeeId`, `time`, `status`) VALUES
(16, 5, 10, '2023-09-14 18:28:36', 'absent'),
(17, 6, 10, '2023-09-10 15:19:52', 'absent');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `idnumber` varchar(255) DEFAULT NULL,
  `phonenumber` varchar(255) DEFAULT NULL,
  `age` varchar(30) DEFAULT NULL,
  `salary` varchar(200) DEFAULT NULL,
  `gender` varchar(55) DEFAULT NULL,
  `siteId` int(11) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `startdate` date DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `emfname` varchar(255) DEFAULT NULL,
  `emlname` varchar(255) DEFAULT NULL,
  `emphone` varchar(255) DEFAULT NULL,
  `emrelation` varchar(255) DEFAULT NULL,
  `doclink` text,
  `username` varchar(255) NOT NULL DEFAULT 'user@gmail.com',
  `password` varchar(255) NOT NULL DEFAULT '12345'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `fname`, `lname`, `idnumber`, `phonenumber`, `age`, `salary`, `gender`, `siteId`, `role`, `startdate`, `dob`, `emfname`, `emlname`, `emphone`, `emrelation`, `doclink`, `username`, `password`) VALUES
(5, 'Sandrine', 'Isheja', '1199380041412204', '0784567890', '30', '34000', 'Male', 2, 'super', '2023-09-12', '1993-09-12', 'MUKANSKUSI', 'Marthe', '0784638209', 'Sister', 'www.google.com', 'admin@gmail.com', '12345'),
(10, 'MUSANA', 'Manzi', '1199080041412209', '0784673890', '23', '670000', 'Female', 1, 'capita', '2023-09-10', '1993-01-10', 'MUKUNZI', 'Yannick', '0785678902', 'Father', 'https://firebasestorage.googleapis.com/v0/b/daada-poducts-images.appspot.com/o/products%2F5.png?alt=media&token=059bcfe9-9147-402c-ab30-f556a7332439', 'mukunzi234@gmail.com', '12345'),
(11, 'MANZI Morris', 'Gasangwa', '1199380041412208', '0784567890', '30', '34000', 'Male', 2, 'projectmanager', '2023-09-12', '1993-09-12', 'MUKANSKUSI', 'Marthe', '0784638209', 'Sister', 'www.google.com', 'manzi29@gmail.com', '12345'),
(12, 'Dophin Morris', 'CYUSA', '1199380041412201', '0784567892', '30', '34000', 'Male', 2, 'sitemanager', '2023-09-12', '1993-09-12', 'MUKANSKUSI', 'Marthe', '0784638209', 'Sister', 'www.google.com', 'manzi23@gmail.com', '12345'),
(13, 'PATRICK IRANKUN', ' IRANKUN', '1199880041412203', '0784838201', '34', '5000', 'Male', 2, 'projectmanager', '2023-09-14', '2023-08-28', 'MUKANKUSI', 'Bella', '0784638202', 'Sister', 'https://firebasestorage.googleapis.com/v0/b/daada-poducts-images.appspot.com/o/products%2Flicensed-image.jpeg?alt=media&token=d981be08-1b76-4db4-9797-8bd87f5a931a', 'MUKANKUSI234@gmail.com', '12345'),
(14, 'Dophin Morris', 'CYUSA', '1198380041412204', '0784638201', '30', '34000', 'Male', 2, 'projectmanager', '2023-09-12', '1993-09-12', 'MUKANSKUSI', 'Marthe', '0784638209', 'Sister', 'www.google.com', 'manzi23@gmail.com', '12345');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `managerId` int(11) NOT NULL,
  `siteId` int(11) DEFAULT NULL,
  `startdate` date DEFAULT NULL,
  `enddate` date DEFAULT NULL,
  `description` text,
  `status` varchar(255) NOT NULL DEFAULT 'running'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `name`, `managerId`, `siteId`, `startdate`, `enddate`, `description`, `status`) VALUES
(4, 'AMAHORO Stadium New', 10, 1, '2023-12-02', '2024-12-02', 'Sawa Projwct', 'completed'),
(5, 'KANOMBE Airport Revamp', 11, 2, '2023-09-11', '2026-09-10', 'Sawasaaaadasdas', 'running'),
(6, 'Kabimba House', 11, 1, '2023-09-10', '2023-09-10', 'Sawa', 'running');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdBy` int(11) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `updatedBy` int(11) NOT NULL,
  `link` text,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `name`, `createdBy`, `status`, `updatedBy`, `link`, `createdAt`, `description`) VALUES
(16, 'Sept2', 10, 'pending', 10, 'www.google.com', '2023-09-10 18:37:31', 'pending'),
(17, 'Sept2', 10, 'pending', 10, 'www.google.com', '2023-09-10 18:38:11', 'pending'),
(18, 'report', 5, 'approved', 5, 'https://firebasestorage.googleapis.com/v0/b/daada-poducts-images.appspot.com/o/products%2FShield%20kids%20requirements.pdf?alt=media&token=c1176cd5-38fa-465b-957e-cc7d99832ca1', '2023-09-10 18:58:04', 'Work Report'),
(19, 'Septermber Logistic', 5, 'rejected', 5, 'Array', '2023-09-10 19:26:50', 'Sawa'),
(20, 'Septermber Logistics', 5, 'approved', 5, 'Array', '2023-09-10 19:27:26', 'Sawaaaa');

-- --------------------------------------------------------

--
-- Table structure for table `sites`
--

CREATE TABLE `sites` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sites`
--

INSERT INTO `sites` (`id`, `name`, `location`, `description`, `createdAt`) VALUES
(1, 'Kimironko Site', 'KK 105 ST', 'Awesome Site', '2023-09-09 12:28:13'),
(2, 'Nyarutarama', 'Nyarutarama kk1209 st', 'awesome Nyarutarama', '2023-09-09 12:28:13'),
(5, 'Kicukiro', 'Kicukiro', 'Kicukiro', '2023-09-09 12:54:04'),
(7, 'Nyabugogo New Site', 'Nyabugogo', 'Nyabugogo', '2023-09-09 13:00:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assign`
--
ALTER TABLE `assign`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assign_ibfk_1` (`employeeId`),
  ADD KEY `assign_ibfk_2` (`projectId`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attendance_ibfk_1` (`employeeId`),
  ADD KEY `attendance_ibfk_2` (`projectId`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employees_ibfk_1` (`siteId`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projects_ibfk_1` (`siteId`),
  ADD KEY `projects_ibfk_2` (`managerId`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reports_ibfk_1` (`createdBy`),
  ADD KEY `reports_ibfk_2` (`updatedBy`);

--
-- Indexes for table `sites`
--
ALTER TABLE `sites`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assign`
--
ALTER TABLE `assign`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `sites`
--
ALTER TABLE `sites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assign`
--
ALTER TABLE `assign`
  ADD CONSTRAINT `assign_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assign_ibfk_2` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`managerId`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`updatedBy`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
