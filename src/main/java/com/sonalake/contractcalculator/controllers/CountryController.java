package com.sonalake.contractcalculator.controllers;

import com.sonalake.contractcalculator.models.Country;
import com.sonalake.contractcalculator.repositories.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/countries")
public class CountryController {

    @Autowired
    private CountryRepository countryRepository;

    @GetMapping
    public List<Country> list() {
        return countryRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void create(@RequestBody Country country) {
        countryRepository.save(country);
    }

    @GetMapping("/{id}")
    public Country get(@PathVariable("id") long id) {
        return countryRepository.getOne(id);
    }
}
