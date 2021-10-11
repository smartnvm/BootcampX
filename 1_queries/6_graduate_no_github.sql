select name, id , cohort_id 
from students 
where github is null 
and end_date is not null;
