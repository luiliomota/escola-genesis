package br.com.alf5.escolagenesis.controller;

import br.com.alf5.escolagenesis.controller.dto.ImagemDto;
import br.com.alf5.escolagenesis.controller.form.AtualizarImagemForm;
import br.com.alf5.escolagenesis.model.CategoriaImagem;
import br.com.alf5.escolagenesis.model.Imagem;
import br.com.alf5.escolagenesis.model.Tratamento;
import br.com.alf5.escolagenesis.repository.CategoriaImagemRepository;
import br.com.alf5.escolagenesis.repository.ImagemRepository;
import br.com.alf5.escolagenesis.repository.PacienteRepository;
import br.com.alf5.escolagenesis.repository.TratamentoRepository;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/imagem")
public class ImagemController {
    @Autowired
    private CategoriaImagemRepository categoriaImagemRepository;
    @Autowired
    private ImagemRepository imagemRepository;
    @Autowired
    private TratamentoRepository tratamentoRepository;
    @Autowired
    private PacienteRepository pacienteRepository;

    //Busca de todas as imagens
    @GetMapping
//    @Cacheable(value = "lista_imagens")
    public Page<ImagemDto> listaImagens(Pageable paginacao) {
        Page<Imagem> imagens = imagemRepository.findAll(paginacao);
        return ImagemDto.converter(imagens);
    }

    //Busca de imagem em bytes por id
    @GetMapping("/byte/{id}")
//    @Cacheable(value = "lista_imagens_byte_id")
    public ResponseEntity<byte[]> imagemByte(@PathVariable Long id) {
        if (imagemRepository.existsById(id)) {
            Imagem imagem = imagemRepository.findById(id).get();
            return ResponseEntity.ok(new ImagemDto(imagem).getBytes());
        }
        return ResponseEntity.notFound().build();
    }

    //Busca de imagem em string base64 por id
    @GetMapping("/base64/{id}")
//    @Cacheable(value = "lista_imagens_base64_id")
    public ResponseEntity<String> imagemBase64(@PathVariable Long id) {
        if (imagemRepository.existsById(id)) {
            Imagem imagem = imagemRepository.findById(id).get();
            return ResponseEntity.ok(new ImagemDto(imagem).getStringBase64());
        }
        return ResponseEntity.notFound().build();
    }

    //Busca de imagem por id
    @GetMapping("/{id}")
//    @Cacheable(value = "lista_imagens_id")
    public ResponseEntity<ImagemDto> imagem(@PathVariable Long id) {
        if (imagemRepository.existsById(id)) {
            Imagem imagem = imagemRepository.findById(id).get();
            return ResponseEntity.ok(new ImagemDto(imagem));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/categorias")
//    @Cacheable(value = "categorias_imagens")
    public ResponseEntity<List<CategoriaImagem>> categorias(){
        return ResponseEntity.ok(categoriaImagemRepository.findAll());
    }

    //Busca de imagens por nome da categoria
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<Page<ImagemDto>> imagemPorCategoria(@PathVariable String categoria,Pageable paginacao){
        if(categoriaImagemRepository.existsByNome(categoria)) {
            Page<Imagem> imagens = imagemRepository.findByCategoria_Nome(categoria, paginacao);
            return ResponseEntity.ok(ImagemDto.converter(imagens));
        }
        return ResponseEntity.notFound().build();
    }

    //Busca de imagens por id do tratamento
    @GetMapping("/tratamento/{idTratamento}")
//    @Cacheable(value = "lista_imagens_idTratamento")
    public ResponseEntity<Page<ImagemDto>> listaImgTratamento(@PathVariable Long idTratamento, Pageable paginacao) {
        if(tratamentoRepository.existsById(idTratamento)){
        Page<Imagem> imagens = imagemRepository.findByTratamento_Id(idTratamento, paginacao);
        return ResponseEntity.ok(ImagemDto.converter(imagens));
        }
        return ResponseEntity.notFound().build();
    }

    //Busca de imagem por categoria e id do tratamento
    @GetMapping("/{categoria}/tratamento/{idTratamento}")
//    @Cacheable(value = "lista_imagens_categoria_idTratamento")
    public ResponseEntity<Page<ImagemDto>> imagemPorCategoriaAndTratamento(@PathVariable String categoria, @PathVariable Long idTratamento, Pageable paginacao){
        if(tratamentoRepository.existsById(idTratamento)||categoriaImagemRepository.existsByNome(categoria)) {
            Page<Imagem> imagens = imagemRepository.findByCategoria_NomeAndTratamento_id(categoria, idTratamento, paginacao);
            return ResponseEntity.ok(ImagemDto.converter(imagens));
        }
        return ResponseEntity.notFound().build();
    }

    //Atualização de imagem
    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<ImagemDto> atualizar(@PathVariable Long id,@RequestBody AtualizarImagemForm form, Pageable paginacao){
        if(imagemRepository.existsById(id)){
            Imagem imagem = form.atualizar(id, imagemRepository, tratamentoRepository, pacienteRepository, categoriaImagemRepository, paginacao);
            return ResponseEntity.ok(new ImagemDto(imagem));
        }
        return ResponseEntity.notFound().build();
    }

    //Upload de imagem
    @PostMapping("/{id}")
    @Transactional
    public ResponseEntity<ImagemDto> upload(@PathVariable Long id, @RequestParam MultipartFile file) throws IOException {
        try {
            if (tratamentoRepository.existsById(id)) {
                Tratamento tratamento = tratamentoRepository.getReferenceById(id);
                Imagem imagem = new Imagem();
                imagem.setNome(file.getOriginalFilename());
                imagem.setBytes(file.getBytes());
                imagem.setTipo(file.getContentType());
                imagem.setTratamento(tratamento);
                imagem.setCategoria(categoriaImagemRepository.findByNome("INICIAL"));
                imagemRepository.save(imagem);
                return ResponseEntity.ok().body(new ImagemDto(imagem));
            }
            return ResponseEntity.notFound().build();
        } catch (FileUploadException e) {
            throw new FileUploadException();
        }
    }

    @PostMapping("/base64/{id}")
    @Transactional
    public ResponseEntity<ImagemDto> uploadBase64(@PathVariable Long id, @RequestBody ImagemDto file) throws IOException {
        if (tratamentoRepository.existsById(id)) {
            Tratamento tratamento = tratamentoRepository.getReferenceById(id);
            Imagem imagem = new Imagem();
            imagem.setNome(file.getNome());
            imagem.setBytes(Base64Utils.decodeFromString(file.getStringBase64()));
            imagem.setTipo(file.getTipo());
            imagem.setTratamento(tratamento);
            imagem.setCategoria(categoriaImagemRepository.getReferenceById(1l));
            imagemRepository.save(imagem);
            return ResponseEntity.ok().body(new ImagemDto(imagem));
        }
        return ResponseEntity.notFound().build();
    }

    //Remoção de imagem por id
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> remover(@PathVariable Long id) {
        if (imagemRepository.existsById(id)) {
            imagemRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
