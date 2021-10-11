SELECT name, id 
FROM students
WHERE (students.email is null OR students.phone is null)
