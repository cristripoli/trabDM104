CREATE TABLE `client` (
`id` INT NOT NULL AUTO_INCREMENT,
`name` VARCHAR( 60 ) NOT NULL ,
`email` VARCHAR( 60 ) NOT NULL ,
`phone` VARCHAR( 20 ) ,
`address` VARCHAR( 70 ) NOT NULL ,
`city` VARCHAR( 20 ) NOT NULL ,
`zipcode` VARCHAR( 20 ) NOT NULL ,
`country` VARCHAR( 20 ) NOT NULL ,
`username` VARCHAR( 12 ) NOT NULL ,
`password` VARCHAR( 12 ) NOT NULL ,
 PRIMARY KEY (`id`),
 UNIQUE INDEX `id_UNIQUE` (`id` ASC)
);

CREATE TABLE `product` (
`id` INT NOT NULL AUTO_INCREMENT,
`name` VARCHAR( 60 ) NOT NULL ,
`description` VARCHAR( 60 ) NOT NULL ,
`price` DECIMAL (10,2) NOT NULL ,
 PRIMARY KEY (`id`),
 UNIQUE INDEX `id_UNIQUE` (`id` ASC)
);

CREATE TABLE `trabalhodm104`.`pedido` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `client_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `total` DECIMAL NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `product_fk_idx` (`product_id` ASC),
  INDEX `client_fk_idx` (`client_id` ASC),
  CONSTRAINT `product_fk`
    FOREIGN KEY (`product_id`)
    REFERENCES `trabalhodm104`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `client_fk`
    FOREIGN KEY (`client_id`)
    REFERENCES `trabalhodm104`.`client` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

INSERT INTO product (name, description, price) values('Product One', 'product one description', 15.50);
INSERT INTO product (name, description, price) values('Product Two', 'product two description', 20.50);
INSERT INTO product (name, description, price) values('Product Three', 'product three description', 50.50);
INSERT INTO product (name, description, price) values('Product Four', 'product four description', 15.90);
INSERT INTO product (name, description, price) values('Product Five', 'product five description', 88.00);