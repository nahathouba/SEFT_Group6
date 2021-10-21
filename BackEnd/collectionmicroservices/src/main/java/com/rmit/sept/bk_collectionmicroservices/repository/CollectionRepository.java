package com.rmit.sept.bk_collectionmicroservices.repository;

import com.rmit.sept.bk_collectionmicroservices.model.Collection;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollectionRepository extends CrudRepository<Collection, Long> {
    Collection findByUsername();
    Collection getById();
}
