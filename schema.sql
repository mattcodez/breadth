SET SCHEMA = 'public';

CREATE TABLE domain_staging (
  id      SERIAL PRIMARY KEY,
  domain  VARCHAR(259)
);
