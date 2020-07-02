package com.ot.portal.repository;

import com.ot.portal.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRoleRepo extends JpaRepository<UserRole, Integer> {

	List<UserRole> findByLdapAuthorityNameIn(List<String> ldapAuthorityNames);

	UserRole findByLdapAuthorityNameContaining(String roleName);

	UserRole findByLdapAuthorityName(String ldapAuthorityName);
}
