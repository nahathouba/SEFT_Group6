package com.rmit.sept.bk_bookservices.model;

public class BookRequest {
    private String sort;
    private String value;

    public BookRequest() {}

    public BookRequest(String sort, String value) {
        this.sort = sort;
        this.value = value;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
