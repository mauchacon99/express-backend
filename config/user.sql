CREATE TABLE IF NOT EXISTS users(
    id int(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    lastname VARCHAR(255),
    phone_number INT(11),
    location VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME 
);

CREATE TABLE IF NOT EXISTS user_events(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    user_id INT(11) NOT NULL,
    event VARCHAR(255) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    CONSTRAINT FKuser FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS roles(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    description VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME
);

CREATE TABLE IF NOT EXISTS access(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    user_id INT(11) NOT NULL,
    role_id INT(11) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    CONSTRAINT FKaccess_user_id FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT FKrole_id FOREIGN KEY(role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS modules(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL, 
    icon VARCHAR(255),
    status TINYINT(1),
    route VARCHAR(255) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME
);

CREATE TABLE IF NOT EXISTS permissions(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    module_id INT(11) NOT NULL,
    role_id INT(11) NOT NULL,
    status TINYINT(1) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    CONSTRAINT FKpermissions_module_id FOREIGN KEY(module_id) REFERENCES modules(id),
    CONSTRAINT FKpermissions_role_id FOREIGN KEY(role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS module_options(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    module_id INT(11) NOT NULL,
    name VARCHAR(255),
    action VARCHAR(255),
    status VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME,
    CONSTRAINT FKmodule_id FOREIGN KEY(module_id) REFERENCES modules(id)
);

CREATE TABLE IF NOT EXISTS options_permissions(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    module_option_id INT(11) NOT NULL,
    role_id INT(11) NOT NULL,
    status VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME,
    CONSTRAINT FKmodule_option_id FOREIGN KEY(module_option_id) REFERENCES module_options(id),
    CONSTRAINT FKoptions_permissions_role_id FOREIGN KEY(role_id) REFERENCES roles(id)
);

