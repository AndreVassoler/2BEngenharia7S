package com.example.CRUD_Pessoa.repository;

import com.example.CRUD_Pessoa.model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PessoaRepository extends JpaRepository<Pessoa,Long> {
}
