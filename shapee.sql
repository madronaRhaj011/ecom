-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 07, 2024 at 06:06 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shapee`
--

-- --------------------------------------------------------

--
-- Table structure for table `billing`
--

CREATE TABLE `billing` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `zipCode` varchar(255) NOT NULL,
  `mobile` int(255) NOT NULL,
  `paymentMethod` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `billing`
--

INSERT INTO `billing` (`id`, `firstName`, `lastName`, `address`, `city`, `country`, `zipCode`, `mobile`, `paymentMethod`) VALUES
(1, 'hatdog', 'test', 'Naujan', 'test', 'test', 'test', 9090977, 'Check Payments');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `quantity` int(11) NOT NULL,
  `total` double NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `name`, `price`, `quantity`, `total`, `product_id`) VALUES
(1, 'Apple', 200, 3, 600, 1),
(2, 'Apple', 80, 3, 80, 1),
(3, 'Raspberry', 390, 3, 1170, 4),
(4, 'Apple', 200, 4, 800, 1),
(9, 'Mango', 200, 2, 400, 2);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'fruit', 'this is a healthy fruit', '2024-09-30 22:49:09', '2024-10-07 23:54:47'),
(2, 'vegetables', 'unique sweet veggie', '2024-09-30 22:49:09', '2024-10-07 22:43:40'),
(3, 'meat', 'this is a source of protein', '2024-09-30 22:49:57', '2024-09-30 22:49:57'),
(4, 'bread', 'this is good with nutella or peanutbutter\r\n', '2024-10-05 22:29:31', '2024-10-05 22:29:31');

-- --------------------------------------------------------

--
-- Table structure for table `productorder`
--

CREATE TABLE `productorder` (
  `order_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` double(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` double(25,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `image_url` text NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `name`, `description`, `price`, `stock`, `category_id`, `image_url`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Apple', 'Sweet delicious fresh red apple', 200.00, 214, 1, 'test', 'Available', '2024-09-30 14:06:22', '2024-10-01 21:31:49'),
(2, 'Mango', 'fresh sweet delicious mango from a mango tree, of course', 200.00, 1234, 1, 'nah', 'Available', '2024-10-01 21:34:14', '2024-10-03 09:45:30'),
(3, 'Carrot', 'freshly picked carrot from a local farm', 80.00, 234, 2, 'carrotimage', 'Available', '2024-10-01 21:36:02', '2024-10-03 09:45:50'),
(4, 'Raspberry', 'freshly picked from the yard', 390.00, 3241, 1, 'raspurl', 'Available', '2024-10-01 21:37:56', '2024-10-03 09:45:57'),
(5, 'cauliflower', 'Looks like a plant', 70.00, 234, 2, 'cauliurl', 'Available', '2024-10-02 13:29:06', '2024-10-06 18:23:47');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `status`) VALUES
(1, 'Rhaj', 'rhaj@gmail.com', '$2b$10$njrLTuX1pQRAhaTsrZTSPOw3mvyc9Kkwvu.XGlLWbhaJVvwHD1sDS', 'user'),
(3, 'hatdog', 'hatdog@gmail.com', '$2b$10$ptWsiMdQ4ZNv5MHtW3XrbOtOOD9nhAcdfcP8gH1TC.CblQlHX2ufS', 'user'),
(4, 'ivan', 'ivan@gmail.com', '$2b$10$qhRy3NXTbeK51IDniuSPFuaoLrZjJ6iXmpKvZFgM/gjtc//sLKdBK', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `billing`
--
ALTER TABLE `billing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `productorder`
--
ALTER TABLE `productorder`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `billing`
--
ALTER TABLE `billing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `productorder`
--
ALTER TABLE `productorder`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
