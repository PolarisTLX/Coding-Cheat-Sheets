DOWNLOAD AND INSTALL:
1. Download and install at mysql.com, Community Edition Server -  https://dev.mysql.com/downloads/mysql/

OPEN AND RUN:
2. Open MySQL Workbench and make sure server is running
3. in CP type:  cd C:\Program Files\MySQL\MySQL Server 5.7\bin
4. in CP type:  mysql -u root -p
5. enter password chosen (bcase) and should be logged in


BASIC COMMANDS:

NOTE: mysql commands are not case sensitive

in CP once logged in, type:

NOTE the  " ; " needed to complete a command

1. show databses;


Create a new database with:
2. create database chosenname
ex: - create database School;

Delete a database with:
3. drop database databasename;
ex: drop database school;

Create table in a database:
first needs to pick a database that will be used:
4.
- use school;
- create table Student   (NO  " ; "  here!!!)
  -> ( Roll int,
  -> Name varchar(50),
  -> Class int,
  -> Marks int,
  -> DOB Date,
  -> Clubs char(10));



VIEWING CONTENT:

Show list of all tables in database:
5. show tables;

Show fields of a particular table:
6. describe student;

Show ALL CONTENT of a particular table:
7. select * from student1;

Show 1 column of a particular table:
8. select column-name from student1;
  ex: select Name from student1;

Show multiple columns of a particular table:
8. select Name, Marks, age, FirstName from student1;



ADD MORE COLUMNS TO A TABLE:
7.
(Add 1 other column to a table:)
- alter table student  (NO  " ; "  here!!!)
  -> add age int;

(Add multiple column to a table:)
- alter table student
  -> add FirstName varchar(50),
  -> add LastName varchar(50);

(Add column at beginning of table  with "first": )
- alter table student
  -> add Address varchar(50) first;

  (Add column to specific location of table  with "after existing-row-name": )
  - alter table student
    -> add MiddleName varchar(50) after FirstName;

DELETE DATA FROM A TABLE:
(NOTE a row in mySQL is actually a "column"??? can look at the tables as sideways?)
(CORRECTIONS APPLIED TO THIS CHEAT SHEET)
8.
(Delete 1 column from table:)
- alter table student drop column row-name;

(Delete mulitple columns from table:)
- alter table student drop column row-name, drop column row-name, drop column row-name;

(Delete 1 row in table:)
- delete from student1 where name='Peter';

(Delete 1 piece of data in table:)
(SEE 12. CHANGE DATA IN TABLE:)
- update student1               ( NO " ; "  HERE!!!)
  ->set MiddleName = NULL
  ->where FirstName ='Natasha';

(Delete ENTIRE content of a table:)
- truncate table student1;

RENAME DATA IN TABLE:
9.
(Change table name:)
  - alter table current-name rename to new-name;

(Change row name:)
  - alter table student   (NO  " ; "  here!!!)
  -> change column current-name new-name type;
  ex: change column DOB DateOfBirth int;

ENTER DATA IN A TABLE:
10.
(Insert 1 set of values:)
 -insert into student1 values (45, 'Peter', 90, '19870130', 30, 'Paul', 'Alexandre', 'Rail');

(Insert multiple sets of values:)
 -insert into student1 values
  (128, 'Boy', 90, '19870130', 30, 'Paul', 'Alexandre', 'Rail'),
  (128, 'Girl1', 75, '19870205', 30, 'Melanie', 'Victoire', 'Rail'),
  (128, 'Girl2', 70, '19870130', 30, 'Natasha', 'Dianne', 'Rail');

11. (insert data into one place in table:)
  - insert into student1(Name,age,LastName)values('James',33,'Robertson');

12. CHANGE DATA IN TABLE:
 -update student1  ( NO " ; "  HERE!!!)
  ->set age = 32
  ->where FirstName ='Melanie';


13. FILTER DATA IN TABLES:
 -select * from student1 where DateOfBirth = 19870130;
 -select * from student1 where age < 31;

(select speficic columns for entries that have LastName = Rail:)
 -select Name,age from student1 where LastName = 'Rail';

 (BETWEEN:)
  -select Name from student1 where age between 31 and 35;

(Matches THIS OR THIS:)
 -select * from student1 where age in (32,33);
 -select * from student1 where FirstName in ('Melanie','Natasha');

(Find data where field STARTS WITH:   xx%)
 -select * from student1 where LastName like 'Ra%';
 -select * from student1 where DateOfBirth like '198701%';

(Find data where field ENDS WITH:   %xx)
 -select * from student1 where LastName like '%il';

(Find data where field CONTAINS:   %xx%)
 -select * from student1 where FirstName like '%au%';

(Find data where fields 2ND character is 'a':  '_a%')
 -select * from student1 where FirstName like '_a%';

(Find data where fields 4TH character is 'a':  '___a%')
 -select * from student1 where FirstName like '___a%';

//THIS DOES NOT WORK?
 -select * from student1 where FirstName in ('%s','%l');


14. ORDER DATA IN TABLES:
  -select * from student1 order by age desc;
  -select * from student1 order by age asc;

15. IGNORE DUPLICATES:
  -select distinct age from student1;

FUNCTIONS:

16. COUNT NUMBER OF ENTRIES:
(count number of names in FirstName column:)
 -select count(FirstName) from student1;

(Number of people with each LastName: )
 -select count(FirstName) from student1 group by LastName;
 //what is in the () doesn't really matter here if there are no voids in the data

(Number of people with age between 25 and 32:)
  -select count(FirstName) from student1 where age between 25 and 32;

17. ADD UP / SUM:
 -select sum(age)from student1;

 -select sum(age)from student1 group by LastName;

 (Return age x 2:)
 -select FirstName,age*2 from student1;
 (Return age / 10:)
 -select FirstName,age/10 from student1;

18. FIND MIN / MAX:
 -select min(age) from student1;
 -select max(age) from student1;


19.  RETURN SPECIFIC # OF ENTRIES:
 (Return top 2 rows:)
 -select * from student1 limit 2;


20. JOINS:
Primary Key: column that matches across both tables, cannot be NULL
Foreign Key: column that exists only in 1 table

Example setup:

 -create table Sports(d_id int auto_increment not null primary key,d_name varchar(20));
 -create table Players(e_id int auto_increment not null primary key,e_name varchar(20),d_id int,foreign key(d_id) references Sports(d_id));

 -insert into Sports values(1,'Dodgeball');
 -insert into Sports(d_name)values('Skiing');
 -insert into Players values(1,'Paul',null);
 -insert into Players(e_name,d_id)values('Tom',2);
 .
 .


INNER JOIN (most common):
 (returns all rows from all tables where join condition is met)

  -select * from Players inner join Sports on Players.d_id=Sports.d_id;

LEFT-OUTER JOIN: (will show all records from left table, and only matched records from the right table)
  (NULL is filled in when there is no match on the right side)
 -select * from Players left join Sports on Players.d_id=Sports.d_id;

RIGHT-OUTER JOIN: (opposite of LEFT-OUTER JOIN):

FULL OUTER JOIN: (Nothing gets ignored, everything is doubles and mirrored)
 (NULL is filled in when there is no match on the EITHER side)
 NOTE: This is achieved with  UNION of a LEFT JOIN + a RIGHT JOIN:

  -select * from Players left join Sports on Players.d_id=Sports.d_id  (NO  " ; "  here!!!)
   -> union
   -> select * from Sports right join Players on Sports.d_id=Players.d_id;
