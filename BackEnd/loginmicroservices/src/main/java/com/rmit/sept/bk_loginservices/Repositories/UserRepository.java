package com.rmit.sept.bk_loginservices.Repositories;

import com.rmit.sept.bk_loginservices.model.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User findByUsername(String username);
    User getById(Long id);

    @Modifying
    @Query("update User set password = ?1 where username = ?2")
    int updateUserPassword(String password, String username);

    @Modifying
    @Query("update User set status = ?2 where username = ?1")
    int updateUserStatus(String username, String status);

    @Modifying
    @Query("update User set role = ?1 where username = ?2")
    int updateUserRole(String role, String username);
}
