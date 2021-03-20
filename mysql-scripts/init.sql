CREATE TABLE IF NOT EXISTS exercises(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS user(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    enabled BOOLEAN
);

CREATE TABLE IF NOT EXISTS routine(
    id INT PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(50) NOT NULL,
    day DATE DEFAULT(CURRENT_DATE)
);

CREATE TABLE IF NOT EXISTS exercise_set(
    id INT PRIMARY KEY AUTO_INCREMENT,
    exercise_id INT NOT NULL,
    user_id INT NOT NULL,
    routine_id INT NOT NULL,
    comment VARCHAR(200),
    FOREIGN KEY (exercise_id) REFERENCES exercises(id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (routine_id) REFERENCES routine(id)
);
