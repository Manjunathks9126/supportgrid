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
@Table(name = "SG_SERVICE_REGISTRATION")
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class,
        property = "serviceId")
public class ServiceReg implements Serializable,Comparable<ServiceReg> {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public ServiceReg(){}
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="serviceId_seq")
    @SequenceGenerator(name = "serviceId_seq", sequenceName = "SG_SERVICE_REGISTRATION_SEQ1", allocationSize = 1)
    @Column(name = "SERVICE_ID")
    private Long serviceId;
    @Column(name = "SERVICE_NAME")
    private String serviceName;
    @Column(name = "DISPLAY_NAME")
    private String displayName;
    @Column(name = "DESCRIPTION")
    private String description;
    @Column(name = "CREATED_BY")
    private String createdBy;
    @Column(name = "MODIFIED_BY")
    private String modifiedBy;
    @Column(name = "SERVICE_URL")
    private String serviceUrl;
    @Column(name = "TILE_ICON_URL")
    private String tileIcon;
    @Column(name = "CREATED_TIME_STAMP")
    private Timestamp createdTimeStamp;
    @Column(name = "MODIFIED_TIME_STAMP")
    private Timestamp modifiedTimeStamp;
    
    @Transient
    private String roleName;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "SG_SERVICE_ROLE_MAPPING",
            joinColumns = @JoinColumn(name = "SERVICE_ID", referencedColumnName = "SERVICE_ID"),
            inverseJoinColumns = @JoinColumn(name = "ROLE_ID", referencedColumnName = "ROLE_ID"))
    private Set<UserRole> userRole;


    @Override
    public int compareTo(ServiceReg o) {
        return o.getServiceId().compareTo(this.serviceId);
    }
}
