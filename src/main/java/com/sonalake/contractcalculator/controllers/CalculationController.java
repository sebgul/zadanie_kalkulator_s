package com.sonalake.contractcalculator.controllers;

import com.sonalake.contractcalculator.models.Calculation;
import com.sonalake.contractcalculator.repositories.CalculationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/calculations")
public class CalculationController {

    @Autowired
    private CalculationRepository calculationRepository;

    @GetMapping
    public List<Calculation> list() {
        return calculationRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void create(@RequestBody Calculation calculation) {
        calculationRepository.save(calculation);
    }

    @GetMapping("/{id}")
    public Calculation get(@PathVariable("id") long id) {
        return calculationRepository.getOne(id);
    }
}
