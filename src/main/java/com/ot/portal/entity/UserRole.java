package com.ot.portal.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "SG_USER_ROLE")
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class,
        property = "role_id")
public class UserRole implements Serializable {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UserRole(){}

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="userRoleId_seq")
    @SequenceGenerator(name = "userRoleId_seq", sequenceName = "SG_USER_ROLE_SEQ1", allocationSize = 1)
    @Column(name = "ROLE_ID")
    private Long roleId;

    @Column(name = "ROLE_NAME")
    private String roleName;

    @Column(name = "ROLE_DESCRIPTION")
    private String roleDescription;

    @Column(name = "LDAP_AUTHORITY_NAME")
    private String ldapAuthorityName;

    @Column(name = "CREATED_TIME_STAMP")
    private Timestamp createdTimeStamp;

    @Column(name = "MODIFIED_TIME_STAMP")
    private Timestamp modifiedTimeStamp;

    @ManyToMany(mappedBy = "userRole" )
    private Set<ServiceReg> serviceReg;

    @Transient
    private boolean isPreExist;
}
