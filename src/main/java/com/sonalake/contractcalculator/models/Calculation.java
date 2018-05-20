package com.sonalake.contractcalculator.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Calculation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    private Country country;

    private String name;
    private BigDecimal grossDaily;
    private BigDecimal plnRate;
    private BigDecimal netPay;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getGrossDaily() {
        return grossDaily;
    }

    public void setGrossDaily(BigDecimal grossDaily) {
        this.grossDaily = grossDaily;
    }

    public BigDecimal getPlnRate() {
        return plnRate;
    }

    public void setPlnRate(BigDecimal plnRate) {
        this.plnRate = plnRate;
    }

    public BigDecimal getNetPay() {
        return netPay;
    }

    public void setNetPay(BigDecimal netPay) {
        this.netPay = netPay;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }
}
