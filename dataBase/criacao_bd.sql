-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema testes_hidroponia_bd
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema testes_hidroponia_bd
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `testes_hidroponia_bd` ;
USE `testes_hidroponia_bd` ;

-- -----------------------------------------------------
-- Table `testes_hidroponia_bd`.`componente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testes_hidroponia_bd`.`componente` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `testes_hidroponia_bd`.`sensor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testes_hidroponia_bd`.`sensor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `componente_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_sensor_componente_idx` (`componente_id` ASC) VISIBLE,
  CONSTRAINT `fk_sensor_componente`
    FOREIGN KEY (`componente_id`)
    REFERENCES `testes_hidroponia_bd`.`componente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `testes_hidroponia_bd`.`atuador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testes_hidroponia_bd`.`atuador` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `componente_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_atuador_componente1_idx` (`componente_id` ASC) VISIBLE,
  CONSTRAINT `fk_atuador_componente1`
    FOREIGN KEY (`componente_id`)
    REFERENCES `testes_hidroponia_bd`.`componente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `testes_hidroponia_bd`.`atributo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testes_hidroponia_bd`.`atributo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `sensor_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_atributo_sensor1_idx` (`sensor_id` ASC) VISIBLE,
  CONSTRAINT `fk_atributo_sensor1`
    FOREIGN KEY (`sensor_id`)
    REFERENCES `testes_hidroponia_bd`.`sensor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `testes_hidroponia_bd`.`medicao_sensor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testes_hidroponia_bd`.`medicao_sensor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `valor_medido` VARCHAR(45) NOT NULL,
  `data_hora` DATETIME NOT NULL,
  `atributo_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_medicao_sensor_atributo1_idx` (`atributo_id` ASC) VISIBLE,
  CONSTRAINT `fk_medicao_sensor_atributo1`
    FOREIGN KEY (`atributo_id`)
    REFERENCES `testes_hidroponia_bd`.`atributo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `testes_hidroponia_bd`.`medicao_atuador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testes_hidroponia_bd`.`medicao_atuador` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `corrente` VARCHAR(45) NOT NULL,
  `tensao` VARCHAR(45) NOT NULL,
  `data_hora` VARCHAR(45) NOT NULL,
  `atuador_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_medicao_atuador_atuador1_idx` (`atuador_id` ASC) VISIBLE,
  CONSTRAINT `fk_medicao_atuador_atuador1`
    FOREIGN KEY (`atuador_id`)
    REFERENCES `testes_hidroponia_bd`.`atuador` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `testes_hidroponia_bd`.`teste_componente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testes_hidroponia_bd`.`teste_componente` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `medicao_sensor_id` INT NOT NULL,
  `medicao_atuador_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_teste_componente_medicao_sensor1_idx` (`medicao_sensor_id` ASC) VISIBLE,
  INDEX `fk_teste_componente_medicao_atuador1_idx` (`medicao_atuador_id` ASC) VISIBLE,
  CONSTRAINT `fk_teste_componente_medicao_sensor1`
    FOREIGN KEY (`medicao_sensor_id`)
    REFERENCES `testes_hidroponia_bd`.`medicao_sensor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_teste_componente_medicao_atuador1`
    FOREIGN KEY (`medicao_atuador_id`)
    REFERENCES `testes_hidroponia_bd`.`medicao_atuador` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
