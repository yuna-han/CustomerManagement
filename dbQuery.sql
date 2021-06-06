USE management;

--CREATE TABLE CUSTOMER
CREATE TABLE customer (
	id INT PRIMARY KEY AUTO_INCREMENT,
	image VARCHAR(1024),
	name VARCHAR(64),
	birthday VARCHAR(64),
	gender VARCHAR(64),
	job VARCHAR(64)
) DEFAULT CHARACTER SET UTF8 COLLATE UTF8_GENERAL_CI;

--INSTERT INTO CUSTOMER
INSERT INTO customer VALUES(1, 'https://placeimg.com/64/64/1', '이액트', '990415', '남자', '학생');
INSERT INTO customer VALUES(2, 'https://placeimg.com/64/64/2', '김고객', '971011', '남자', '프로그래머');
INSERT INTO customer VALUES(3, 'https://placeimg.com/64/64/3', '한꽁치', '991010', '남자', '고양이');

