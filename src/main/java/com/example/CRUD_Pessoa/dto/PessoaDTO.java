package com.example.CRUD_Pessoa.dto;

import java.util.List;

public class PessoaDTO {

    private List<UserResult> results;

    public List<UserResult> getResults() {
        return results;
    }

    public void setResults(List<UserResult> results) {
        this.results = results;
    }

    public static class UserResult {
        private Name name;
        private String email;
        private Location location;

        public Name getName() {
            return name;
        }

        public void setName(Name name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public Location getLocation() {
            return location;
        }

        public void setLocation(Location location) {
            this.location = location;
        }
    }

    public static class Name {
        private String first;
        private String last;

        public String getFirst() { return first; }

        public void setFirst(String first) { this.first = first; }

        public String getLast() { return last; }

        public void setLast(String last) { this.last = last; }
    }

    public static class Location {
        private String city;

        public String getCity() { return city; }

        public void setCity(String city) { this.city = city; }
    }

}
