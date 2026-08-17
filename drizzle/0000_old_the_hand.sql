CREATE TABLE `admin_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`external_id` text NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`role` text DEFAULT 'manager' NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_admin_users_external_id` ON `admin_users` (`external_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_admin_users_email` ON `admin_users` (`email`);--> statement-breakpoint
CREATE TABLE `amenities` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`icon` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `amenities_name_unique` ON `amenities` (`name`);--> statement-breakpoint
CREATE TABLE `audit_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`actor_id` text NOT NULL,
	`actor_email` text NOT NULL,
	`action` text NOT NULL,
	`entity_type` text NOT NULL,
	`entity_id` text,
	`details` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_audit_log_created` ON `audit_log` (`created_at`);--> statement-breakpoint
CREATE TABLE `blocked_dates` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`room_slug` text NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text NOT NULL,
	`reason` text,
	`created_by` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_blocked_dates_room_dates` ON `blocked_dates` (`room_slug`,`start_date`,`end_date`);--> statement-breakpoint
CREATE TABLE `booking_nights` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`booking_code` text NOT NULL,
	`room_slug` text NOT NULL,
	`night` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_booking_nights_unique` ON `booking_nights` (`room_slug`,`night`);--> statement-breakpoint
CREATE INDEX `idx_booking_nights_code` ON `booking_nights` (`booking_code`);--> statement-breakpoint
CREATE TABLE `booking_services` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`booking_id` integer NOT NULL,
	`service_id` integer,
	`service_name` text NOT NULL,
	`price` integer NOT NULL,
	`quantity` integer DEFAULT 1 NOT NULL,
	FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_booking_services_booking` ON `booking_services` (`booking_id`);--> statement-breakpoint
CREATE TABLE `bookings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text NOT NULL,
	`guest_id` integer,
	`room_slug` text NOT NULL,
	`room_name` text NOT NULL,
	`check_in` text NOT NULL,
	`check_out` text NOT NULL,
	`adults` integer NOT NULL,
	`children` integer DEFAULT 0 NOT NULL,
	`child_ages` text,
	`guest_name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`comment` text,
	`internal_note` text,
	`source` text DEFAULT 'site' NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`total` integer NOT NULL,
	`prepayment` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`guest_id`) REFERENCES `guests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bookings_code_unique` ON `bookings` (`code`);--> statement-breakpoint
CREATE INDEX `idx_bookings_room_dates` ON `bookings` (`room_slug`,`check_in`,`check_out`);--> statement-breakpoint
CREATE INDEX `idx_bookings_status_checkin` ON `bookings` (`status`,`check_in`);--> statement-breakpoint
CREATE INDEX `idx_bookings_created` ON `bookings` (`created_at`);--> statement-breakpoint
CREATE TABLE `content_pages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`kind` text DEFAULT 'page' NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_by` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `content_pages_slug_unique` ON `content_pages` (`slug`);--> statement-breakpoint
CREATE TABLE `gallery_photos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category` text NOT NULL,
	`url` text NOT NULL,
	`storage_key` text,
	`alt` text DEFAULT '' NOT NULL,
	`visible` integer DEFAULT true NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `guests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`notes` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_guests_phone` ON `guests` (`phone`);--> statement-breakpoint
CREATE INDEX `idx_guests_email` ON `guests` (`email`);--> statement-breakpoint
CREATE TABLE `payments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`booking_id` integer NOT NULL,
	`amount` integer NOT NULL,
	`kind` text DEFAULT 'prepayment' NOT NULL,
	`method` text,
	`status` text DEFAULT 'received' NOT NULL,
	`note` text,
	`paid_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_payments_booking` ON `payments` (`booking_id`);--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`guest_name` text NOT NULL,
	`text` text NOT NULL,
	`rating` integer NOT NULL,
	`stay_label` text,
	`visible` integer DEFAULT true NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `room_amenities` (
	`room_id` integer NOT NULL,
	`amenity_id` integer NOT NULL,
	FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`amenity_id`) REFERENCES `amenities`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_room_amenity_unique` ON `room_amenities` (`room_id`,`amenity_id`);--> statement-breakpoint
CREATE TABLE `room_photos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`room_id` integer NOT NULL,
	`storage_key` text,
	`url` text NOT NULL,
	`alt` text DEFAULT '' NOT NULL,
	`is_main` integer DEFAULT false NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_room_photos_room_sort` ON `room_photos` (`room_id`,`sort_order`);--> statement-breakpoint
CREATE TABLE `room_types` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `room_types_slug_unique` ON `room_types` (`slug`);--> statement-breakpoint
CREATE TABLE `rooms` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`room_type_id` integer,
	`summary` text NOT NULL,
	`description` text NOT NULL,
	`price` integer NOT NULL,
	`old_price` integer,
	`capacity` integer NOT NULL,
	`area` real NOT NULL,
	`beds` text NOT NULL,
	`bedrooms` integer NOT NULL,
	`visible` integer DEFAULT true NOT NULL,
	`popular` integer DEFAULT false NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`room_type_id`) REFERENCES `room_types`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `rooms_slug_unique` ON `rooms` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_rooms_visible_sort` ON `rooms` (`visible`,`sort_order`);--> statement-breakpoint
CREATE TABLE `service_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `service_categories_slug_unique` ON `service_categories` (`slug`);--> statement-breakpoint
CREATE TABLE `services` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category_id` integer,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`price` integer NOT NULL,
	`unit` text NOT NULL,
	`duration` text,
	`image_url` text,
	`storage_key` text,
	`requires_booking` integer DEFAULT false NOT NULL,
	`bookable` integer DEFAULT true NOT NULL,
	`visible` integer DEFAULT true NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `service_categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `site_settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL,
	`type` text DEFAULT 'text' NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_by` text
);
