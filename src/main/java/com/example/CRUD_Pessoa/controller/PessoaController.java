package com.example.CRUD_Pessoa.controller;

import com.example.CRUD_Pessoa.model.Pessoa;
import com.example.CRUD_Pessoa.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pessoas")
public class PessoaController {

    @Autowired
    private PessoaService service;

    @GetMapping
    public List<Pessoa> listarTodos() {
        return service.findAll();
    }

    @PostMapping
    public Pessoa criar(@RequestBody Pessoa pessoa) {
        return service.create(pessoa);
    }

    @PutMapping("/{id}")
    public Pessoa atualizar(@PathVariable Long id, @RequestBody Pessoa pessoa) {
        return service.update(id, pessoa);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.delete(id);
    }


}