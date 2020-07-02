package com.ot.portal.repository;

import com.ot.portal.entity.ServiceReg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRegistrationRepo extends JpaRepository<ServiceReg,Long> {

    List<ServiceReg> findByServiceUrlIn(List<String> serviceUrl);
    ServiceReg findByServiceUrl(String serviceUrl);
}
