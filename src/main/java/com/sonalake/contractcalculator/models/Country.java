package com.sonalake.contractcalculator.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigDecimal;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;
    private String currency;
    private String isoCode;
    private String currencyCode;
    private String currencySymbol;
    private Short workingDaysInMonth;
    private Double incomeTaxRate;
    private BigDecimal fixedCosts;

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

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getIsoCode() {
        return isoCode;
    }

    public void setIsoCode(String isoCode) {
        this.isoCode = isoCode;
    }

    public String getCurrencyCode() {
        return currencyCode;
    }

    public void setCurrencyCode(String currencyCode) {
        this.currencyCode = currencyCode;
    }

    public String getCurrencySymbol() {
        return currencySymbol;
    }

    public void setCurrencySymbol(String currencySymbol) {
        this.currencySymbol = currencySymbol;
    }

    public Short getWorkingDaysInMonth() {
        return workingDaysInMonth;
    }

    public void setWorkingDaysInMonth(Short workingDaysInMonth) {
        this.workingDaysInMonth = workingDaysInMonth;
    }

    public Double getIncomeTaxRate() {
        return incomeTaxRate;
    }

    public void setIncomeTaxRate(Double incomeTaxRate) {
        this.incomeTaxRate = incomeTaxRate;
    }

    public BigDecimal getFixedCosts() {
        return fixedCosts;
    }

    public void setFixedCosts(BigDecimal fixedCosts) {
        this.fixedCosts = fixedCosts;
    }
}
