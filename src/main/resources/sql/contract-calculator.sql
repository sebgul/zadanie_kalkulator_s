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
