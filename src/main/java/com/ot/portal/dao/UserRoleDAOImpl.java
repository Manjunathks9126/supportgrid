package com.ot.portal.dao;

import com.ot.portal.entity.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository("userRoleDao")
public class UserRoleDAOImpl {

	@Autowired
	JdbcTemplate jdbcTemplate;

	@Transactional
	public List<UserRole> getRoles() throws Exception {
		String SQL = "SELECT * FROM SG_USER_ROLE";

		List<UserRole> response = null;
		try {
			response = jdbcTemplate.query(SQL, new BeanPropertyRowMapper<>(UserRole.class));
		} catch (Exception e) {
			throw new Exception("Could not get role from DB");
		}
		return response;
	}

	@Transactional
	public List<UserRole> deleteMappingRoles(long roleid) throws Exception {
		String SQL = "DELETE FROM SG_SERVICE_ROLE_MAPPING where ROLE_ID= ?";
		Object[] args = new Object[] {roleid};
		List<UserRole> response = null;
		try {
			jdbcTemplate.update(SQL, args);
		} catch (Exception e) {
			throw new Exception("Could not get role from DB");
		}
		return response;
	}
}
