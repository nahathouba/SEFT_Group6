package com.rmit.sept.bk_bookServices.Repositories;

import com.rmit.sept.bk_bookServices.model.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends CrudRepository<Book, Long>{
    List<Book> findByTitle(String title);
    Book findByisbn(long isbn);
    List<Book> findAllByAuthor(String authorName);
    List<Book> findAllByCategory(String category);
}
