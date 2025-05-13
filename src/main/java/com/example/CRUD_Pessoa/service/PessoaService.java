package com.example.CRUD_Pessoa.service;

import com.example.CRUD_Pessoa.dto.PessoaDTO;
import com.example.CRUD_Pessoa.model.Pessoa;
import com.example.CRUD_Pessoa.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service

public class PessoaService {

    @Autowired
    private PessoaRepository repository;

    public List<Pessoa> importarPessoasExternas() {
        RestTemplate restTemplate = new RestTemplate();
        PessoaDTO response = restTemplate.getForObject(
                "https://randomuser.me/api/?results=10", PessoaDTO.class);

        List<Pessoa> pessoas = response.getResults().stream().map(result -> {
            Pessoa p = new Pessoa();
            p.setNome(result.getName().getFirst() + " " + result.getName().getLast());
            p.setEmail(result.getEmail());
            p.setCidade(result.getLocation().getCity());
            return p;
        }).collect(Collectors.toList());

        return repository.saveAll(pessoas);
    }

    public List<Pessoa> findAll() {
        return repository.findAll();
    }

    public Pessoa create(Pessoa pessoa) {
        return repository.save(pessoa);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Pessoa update(Long id, Pessoa pessoaAtualizada) {
        Pessoa pessoa = repository.findById(id).orElseThrow();
        pessoa.setNome(pessoaAtualizada.getNome());
        pessoa.setEmail(pessoaAtualizada.getEmail());
        pessoa.setCidade(pessoaAtualizada.getCidade());
        return repository.save(pessoa);
    }


}
