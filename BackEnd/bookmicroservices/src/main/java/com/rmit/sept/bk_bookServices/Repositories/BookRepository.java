package com.rmit.sept.bk_bookServices.Repositories;

import com.rmit.sept.bk_bookServices.model.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends CrudRepository<Book, Long>{
    Book findByTitle(String title);
    Book findByisbn(long isbn);
    Book findByAuthor(String authorName);
    Book findByCategory(String category);
}
