#JAVA_HOME=/qual/qtotcna1/build/QNEOLIT20190529-041116/java

#   CATALINA_OPTS   (Optional) Java runtime options used when the "start",
#                   "run" or "debug" command is executed.
#                   Include here and not in JAVA_OPTS all options, that should
#                   only be used by Tomcat itself, not by the stop process,
#                   the version command etc.
#                   Examples are heap size, GC logging, JMX ports etc.
# CATALINA_OPTS="$CATALINA_OPTS -Dprobe.group=tgo_q_lit_tomcat85 "
# CATALINA_OPTS="$CATALINA_OPTS -Dprobe.id=TGO_q_lit_qtotcna1 "
# CATALINA_OPTS="$CATALINA_OPTS -Xbootclasspath/p:/var/opt/MercuryDiagnostics/JavaAgent_v9.24.113.139/DiagnosticsAgent/classes/Redhat/1.8/instr.jre "
# CATALINA_OPTS="$CATALINA_OPTS -javaagent:/var/opt/MercuryDiagnostics/JavaAgent_v9.24.113.139/DiagnosticsAgent/lib/probeagent.jar "
# CATALINA_OPTS="$CATALINA_OPTS -Xms1G -Xmx1G "
# CATALINA_OPTS="$CATALINA_OPTS -Xrunjdwp:transport=dt_socket,address=1415,server=y,suspend=n "
# CATALINA_OPTS="$CATALINA_OPTS -DCOMMUNITY_DIR=/qual/qtotcna1/active "
# CATALINA_OPTS="$CATALINA_OPTS -Dcom.gxs.common.configuration.proxy.envid=jvmId1 "
# CATALINA_OPTS="$CATALINA_OPTS -Dcom.gxs.common.configuration.localenvid=im "
# CATALINA_OPTS="$CATALINA_OPTS -Dcom.gxs.common.configuration.caching.enabled=false "
# CATALINA_OPTS="$CATALINA_OPTS -Dcom.gxs.tg.containerid=IQA "
# CATALINA_OPTS="$CATALINA_OPTS -Djavax.net.ssl.keyStore=/clients/raqa/active/etc/config/certs/work/dev64.pfx "
# CATALINA_OPTS="$CATALINA_OPTS -Djavax.rmi.CORBA.StubClass=weblogic.corba.client.iiop.WLStubDelegate "
# CATALINA_OPTS="$CATALINA_OPTS -Dorg.xml.sax.driver=com.sun.org.apache.xerces.internal.parsers.SAXParser "
# CATALINA_OPTS="$CATALINA_OPTS -Dsun.lang.ClassLoader.allowArraySyntax=true "
# CATALINA_OPTS="$CATALINA_OPTS -Dorg.apache.jasper.compiler.Parser.STRICT_QUOTE_ESCAPING=false "
# CATALINA_OPTS="$CATALINA_OPTS -DSMSESSIONID_KEY=SMSERVERSESSIONID "
#CATALINA_OPTS="$CATALINA_OPTS -Dlog_path=/qual/qtotcna1/logs/neo "
CATALINA_OPTS="$CATALINA_OPTS -DENV=IQA "
CATALINA_OPTS="$CATALINA_OPTS -Dlog_path=C:\active\logs "
# CATALINA_OPTS="$CATALINA_OPTS -Dlogging.config=/qual/qtotcna1/build/QNEOLIT20190529-041116/apps/log4j/log4j2.xml "

#   JAVA_OPTS       (Optional) Java runtime options used when any command
#                   is executed.
#                   Include here and not in CATALINA_OPTS all options, that
#                   should be used by Tomcat and also by the stop process,
#                   the version command etc.
#                   Most options should go into CATALINA_OPTS.

CATALINA_PID="$CATALINA_BASE/tomcat.pid"
