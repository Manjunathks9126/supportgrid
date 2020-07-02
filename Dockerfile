#
# /******************************************************************************
#  All rights reserved. All information contained in this software is confidential
#  and proprietary to opentext. No part of this software may be
#  reproduced or transmitted in any form or any means, electronic, mechanical,
#  photocopying, recording or otherwise stored in any retrieval system of any
#  nature without the prior written permission of opentext.
#  This material is a trade secret and its confidentiality is strictly maintained.
#  Use of any copyright notice does not imply unrestricted public access to this
#  material.
#
#  (c) opentext
#
#  *******************************************************************************
#  Change Log:
#  Date          Name                Defect#           Description
#  -------------------------------------------------------------------------------
#  01/30/2020    Pavan                              Initial Creation
#  ******************************************************************************/
#
FROM artifactory.otxlab.net/bpdockerhub/alloy/jre11:3.7.1 as supportgrid-portal
VOLUME /tmp
ARG JAR_FILE

RUN groupadd --system appuser
RUN useradd -g appuser -s /sbin/nologin appuser
RUN mkdir /opt/application
RUN chown -R appuser:appuser /opt/application

# Run as non-root
USER appuser

WORKDIR /opt/application
COPY ${JAR_FILE} app.jar

#CMD ["java", "-jar", "/opt/application/app.jar", "5"]
ENTRYPOINT java \
  -javaagent:${NEWRELIC_AGENT_HOME}/agent.jar \
  -jar /opt/application/app.jar