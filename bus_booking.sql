-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 29, 2024 at 05:34 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bus_booking`
--

-- --------------------------------------------------------

--
-- Table structure for table `Bus`
--

CREATE TABLE `Bus` (
  `BusID` int(11) NOT NULL,
  `BusRegNo` varchar(12) NOT NULL,
  `Latitude` float NOT NULL,
  `Longitude` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Bus`
--

INSERT INTO `Bus` (`BusID`, `BusRegNo`, `Latitude`, `Longitude`) VALUES
(1, 'JH02-AC 5908', 23.45, 40.45),
(2, 'JH02-AC 5909', 23.45, 40.45);

-- --------------------------------------------------------

--
-- Table structure for table `BusRoute`
--

CREATE TABLE `BusRoute` (
  `RouteID` int(11) NOT NULL,
  `RouteName` varchar(255) DEFAULT NULL,
  `TotalDistance` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Fare`
--

CREATE TABLE `Fare` (
  `id` int(11) NOT NULL,
  `RouteID` int(11) NOT NULL,
  `BaseFare` float DEFAULT NULL,
  `FarePerKM` float DEFAULT NULL,
  `ServiceType` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Fare`
--

INSERT INTO `Fare` (`id`, `RouteID`, `BaseFare`, `FarePerKM`, `ServiceType`) VALUES
(0, 1, 10, 1, 'Ordinary'),
(0, 2, 15, 1.5, 'Express'),
(0, 3, 20, 2, 'Deluxe');

-- --------------------------------------------------------

--
-- Table structure for table `Route`
--

CREATE TABLE `Route` (
  `RouteID` int(11) NOT NULL,
  `RouteName` varchar(255) DEFAULT NULL,
  `TotalDistance` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Route`
--

INSERT INTO `Route` (`RouteID`, `RouteName`, `TotalDistance`) VALUES
(1, 'Route A', 100),
(2, 'Route B', 150),
(3, 'Route C', 80);

-- --------------------------------------------------------

--
-- Table structure for table `RouteStop`
--

CREATE TABLE `RouteStop` (
  `RouteID` int(11) NOT NULL,
  `StopID` int(11) NOT NULL,
  `StopOrder` int(11) DEFAULT NULL,
  `DistanceFromPrevious` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `RouteStop`
--

INSERT INTO `RouteStop` (`RouteID`, `StopID`, `StopOrder`, `DistanceFromPrevious`) VALUES
(1, 1, 1, 0),
(1, 2, 2, 20),
(1, 3, 3, 30),
(2, 3, 1, 0),
(2, 4, 2, 40),
(2, 5, 3, 60),
(3, 1, 1, 0),
(3, 4, 2, 35),
(3, 5, 3, 45);

-- --------------------------------------------------------

--
-- Table structure for table `Stop`
--

CREATE TABLE `Stop` (
  `StopID` int(11) NOT NULL,
  `StopName` varchar(255) DEFAULT NULL,
  `Latitude` float DEFAULT NULL,
  `Longitude` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Stop`
--

INSERT INTO `Stop` (`StopID`, `StopName`, `Latitude`, `Longitude`) VALUES
(1, 'Stop 1', 12.9716, 77.5946),
(2, 'Stop 2', 13.0827, 80.2707),
(3, 'Stop 3', 12.2958, 76.6394),
(4, 'Stop 4', 11.0168, 76.9558),
(5, 'Stop 5', 10.8505, 76.2711);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Bus`
--
ALTER TABLE `Bus`
  ADD PRIMARY KEY (`BusID`);

--
-- Indexes for table `BusRoute`
--
ALTER TABLE `BusRoute`
  ADD PRIMARY KEY (`RouteID`);

--
-- Indexes for table `Fare`
--
ALTER TABLE `Fare`
  ADD PRIMARY KEY (`RouteID`);

--
-- Indexes for table `Route`
--
ALTER TABLE `Route`
  ADD PRIMARY KEY (`RouteID`);

--
-- Indexes for table `RouteStop`
--
ALTER TABLE `RouteStop`
  ADD PRIMARY KEY (`RouteID`,`StopID`),
  ADD KEY `StopID` (`StopID`);

--
-- Indexes for table `Stop`
--
ALTER TABLE `Stop`
  ADD PRIMARY KEY (`StopID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Bus`
--
ALTER TABLE `Bus`
  MODIFY `BusID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `BusRoute`
--
ALTER TABLE `BusRoute`
  MODIFY `RouteID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Route`
--
ALTER TABLE `Route`
  MODIFY `RouteID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `Stop`
--
ALTER TABLE `Stop`
  MODIFY `StopID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Fare`
--
ALTER TABLE `Fare`
  ADD CONSTRAINT `fare_ibfk_1` FOREIGN KEY (`RouteID`) REFERENCES `route` (`RouteID`);

--
-- Constraints for table `RouteStop`
--
ALTER TABLE `RouteStop`
  ADD CONSTRAINT `routestop_ibfk_1` FOREIGN KEY (`RouteID`) REFERENCES `route` (`RouteID`),
  ADD CONSTRAINT `routestop_ibfk_2` FOREIGN KEY (`StopID`) REFERENCES `Stop` (`StopID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
