-- Script de inicialización de la base de datos para Bendito Capricho
CREATE DATABASE bendito_capricho;
USE bendito_capricho;

CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type ENUM('Ingreso', 'Gasto') NOT NULL,
  category VARCHAR(100) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client VARCHAR(150) NOT NULL,
  service VARCHAR(100) NOT NULL,
  date DATETIME NOT NULL,
  status ENUM('Pendiente', 'Confirmado', 'Recordatorio enviado', 'Cancelado') DEFAULT 'Pendiente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reminders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reservation_id INT NOT NULL,
  message_type ENUM('WhatsApp', 'Email') DEFAULT 'WhatsApp',
  status ENUM('Activo', 'Inactivo') DEFAULT 'Activo',
  sent_at DATETIME,
  FOREIGN KEY (reservation_id) REFERENCES reservations(id)
);

INSERT INTO transactions VALUES 
(1, 'Ingreso', 'Manicure', 150, '2025-05-10 10:00:00', 'Servicio premium', NOW()),
(2, 'Gasto', 'Materiales', 45, '2025-05-09 14:30:00', 'Esmaltes nuevos', NOW()),
(3, 'Ingreso', 'Pedicure', 80, '2025-05-09 11:00:00', 'Cliente recurrente', NOW());