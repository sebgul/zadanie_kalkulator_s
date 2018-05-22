DROP TABLE calculation;
DROP TABLE hibernate_sequence_calculations;

-- countries

DROP TABLE country;
DROP TABLE hibernate_sequence;

CREATE TABLE
    country
    (
        id BIGINT NOT NULL,
        name VARCHAR NOT NULL,
        currency VARCHAR NOT NULL,
        iso_code VARCHAR NOT NULL,
        currency_code VARCHAR NOT NULL,
        currency_symbol VARCHAR NOT NULL,
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

INSERT INTO country (id, name, currency, iso_code, currency_code, currency_symbol, working_days_in_month, income_tax_rate, fixed_costs)
  VALUES (1, "Germany", "Euro", "DEU", "EUR", "€", 22, 0.2, 800);
INSERT INTO country (id, name, currency, iso_code, currency_code, currency_symbol, working_days_in_month, income_tax_rate, fixed_costs)
  VALUES (2, "Great Britain", "British pound", "GBR", "GBP", "£", 22, 0.25, 600);
INSERT INTO country (id, name, currency, iso_code, currency_code, currency_symbol, working_days_in_month, income_tax_rate, fixed_costs)
  VALUES (3, "Poland", "Polish złoty", "POL", "PLN", "zł", 22, 0.19, 1200);

INSERT INTO hibernate_sequence (next_val) VALUES (4);

-- calculations

DROP TABLE calculation;
DROP TABLE hibernate_sequence_calculations;

CREATE TABLE
    calculation
    (
        id BIGINT NOT NULL,
        name VARCHAR NULL,
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

INSERT INTO calculation(id, name, gross_daily, pln_rate, net_pay, country_id)
  VALUES(1, "Germany calculation", 0, 4.3424, 0, 1);
INSERT INTO calculation(id, name, gross_daily, pln_rate, net_pay, country_id)
  VALUES(2, "Great Britain calculation", 0, 4.956, 0, 2);
INSERT INTO calculation(id, name, gross_daily, pln_rate, net_pay, country_id)
  VALUES(3, "Poland calculation", 0, 1, 0, 3);

INSERT INTO hibernate_sequence_calculations (next_val) VALUES (4);
