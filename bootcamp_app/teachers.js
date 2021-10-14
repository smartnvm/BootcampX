const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx',
});

args = process.argv.slice(2);

cohortName = args[0] || 'JUL02';
limit = args[1] || 10;

console.log(cohortName, limit);
pool.query(
  `SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
  FROM assistance_requests
  JOIN teachers ON teachers.id = teacher_id
  JOIN students ON students.id = student_id
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name = $1
  ORDER BY teachers.name
  LIMIT $2;`, [cohortName, limit])
  .then((res) => {
    res.rows.forEach((row) => {
      console.log(`${row.cohort}: ${row.teacher}`);
    });
  }).catch((err) => console.error('query error', err.stack))
  .finally(() => pool.end());