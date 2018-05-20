-- countries

CREATE TABLE
    country
    (
        id BIGINT NOT NULL,
        name VARCHAR NOT NULL,
        iso_code VARCHAR NOT NULL,
        working_days_in_month INT NOT NULL,
        income_tax_rate NUMERIC NOT NULL,
        fixed_costs NUMERIC NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    hibernate_sequence
    (
        next_val BIGINT
    );

INSERT INTO country (id, name, iso_code, working_days_in_month, income_tax_rate, fixed_costs)
  VALUES (1, "Germany", "GER", 22, 0.2, 800);
INSERT INTO country (id, name, iso_code, working_days_in_month, income_tax_rate, fixed_costs)
  VALUES (2, "Great Britain", "GBP", 22, 0.25, 600);
INSERT INTO country (id, name, iso_code, working_days_in_month, income_tax_rate, fixed_costs)
  VALUES (3, "Poland", "POL", 22, 0.19, 1200);

INSERT INTO hibernate_sequence (next_val) VALUES (4);

-- calculations

DROP TABLE calculation;
DROP TABLE hibernate_sequence_calculations;

CREATE TABLE
    calculation
    (
        id BIGINT NOT NULL,
        gross_daily NUMERIC NULL,
        pln_rate NUMERIC NULL,
        net_pay NUMERIC NULL,
        country_id BIGINT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (country_id) REFERENCES country(id)
    );

CREATE TABLE
    hibernate_sequence_calculations
    (
        next_val BIGINT
    );

-- INSERT INTO calculation(id, gross_daily, pln_rate, net_pay, country_id)
--   VALUES(1, NULL, NULL, NULL, 1);
-- INSERT INTO calculation(id, gross_daily, pln_rate, net_pay, country_id)
--   VALUES(2, NULL, NULL, NULL, 2);
-- INSERT INTO calculation(id, gross_daily, pln_rate, net_pay, country_id)
--   VALUES(3, NULL, NULL, NULL, 3);

INSERT INTO calculation(id, gross_daily, pln_rate, net_pay, country_id)
  VALUES(1, 0, 0, 0, 1);
INSERT INTO calculation(id, gross_daily, pln_rate, net_pay, country_id)
  VALUES(2, 0, 0, 0, 2);
INSERT INTO calculation(id, gross_daily, pln_rate, net_pay, country_id)
  VALUES(3, 0, 0, 0, 3);

INSERT INTO hibernate_sequence_calculations (next_val) VALUES (4);
