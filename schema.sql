#sudo -u postgres psql
#

CREATE DATABASE breadth;


SET SCHEMA 'public';

CREATE TABLE domain_staging (
  "id"      SERIAL PRIMARY KEY,
  "domain"  VARCHAR(259)
);
GRANT ALL ON domain_staging TO "importer";
