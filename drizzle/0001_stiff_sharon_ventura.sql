PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_booking_services` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`booking_id` integer,
	`booking_code` text NOT NULL,
	`service_id` integer,
	`service_name` text NOT NULL,
	`price` integer NOT NULL,
	`quantity` integer DEFAULT 1 NOT NULL,
	FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_booking_services`("id", "booking_id", "booking_code", "service_id", "service_name", "price", "quantity") SELECT "id", "booking_id", "booking_code", "service_id", "service_name", "price", "quantity" FROM `booking_services`;--> statement-breakpoint
DROP TABLE `booking_services`;--> statement-breakpoint
ALTER TABLE `__new_booking_services` RENAME TO `booking_services`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `idx_booking_services_booking` ON `booking_services` (`booking_id`);--> statement-breakpoint
CREATE INDEX `idx_booking_services_code` ON `booking_services` (`booking_code`);