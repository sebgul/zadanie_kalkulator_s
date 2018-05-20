package com.sonalake.contractcalculator.repositories;

import com.sonalake.contractcalculator.models.Calculation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CalculationRepository extends JpaRepository<Calculation, Long> {
}
