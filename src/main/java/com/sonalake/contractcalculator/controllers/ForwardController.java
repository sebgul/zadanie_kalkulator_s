package com.sonalake.contractcalculator.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping
public class ForwardController {

    @GetMapping(value = "/**/**/{[path:[^\\.]*}")
    public ModelAndView forward() {
        return new ModelAndView("/index.html");
    }
}
