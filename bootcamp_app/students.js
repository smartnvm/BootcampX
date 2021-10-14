const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx',
});

args = process.argv.slice(2);

cohortName = args[0] || 'FEB';
limit = args[1] || 5;

const strQuery =
  `select students.id, students.name, cohorts.name as cohorts_name
  from students 
  join cohorts on cohorts.id = students.cohort_id
  where cohorts.name like $1
  limit $2;`;

const values = [`%${cohortName}%`, limit];

pool.query(strQuery, values)
  .then((res) => {
    res.rows.forEach((row) => {
      console.log(row);
    });
  }).catch((err) => console.error('query error', err.stack))
  .finally(() => pool.end());