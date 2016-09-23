#sudo -u postgres psql
#

CREATE DATABASE breadth;


SET SCHEMA 'public';

CREATE TABLE domain_staging (
  "id"      SERIAL PRIMARY KEY,
  "domain"  VARCHAR(259)
);
--GRANT ALL ON domain_staging TO "importer";

CREATE TABLE domains (
  "id"      SERIAL PRIMARY KEY,
  "domain"  VARCHAR(259) UNIQUE NOT NULL
);

CREATE OR REPLACE FUNCTION add_domains_from_staging()
RETURNS int AS $$
BEGIN
  INSERT INTO domains(domain)
  SELECT domain FROM domain_staging
  ON CONFLICT DO NOTHING;
  GET DIAGNOSTICS insertcount = ROW_COUNT;
  RETURNING insertcount;
END;
$$ LANGUAGE plpgsql;
