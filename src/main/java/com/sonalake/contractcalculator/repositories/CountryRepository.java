package com.sonalake.contractcalculator.repositories;

import com.sonalake.contractcalculator.models.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, Long> {
}
