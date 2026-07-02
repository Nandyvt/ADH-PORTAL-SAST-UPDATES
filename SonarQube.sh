#!/bin/sh
wget -q https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.6.1.2450-linux.zip
unzip -q sonar-scanner-cli-4.6.1.2450-linux.zip
mv sonar-scanner-4.6.1.2450-linux /sonarscanner
export PATH=$PATH:/sonarscanner/bin
sonar-scanner -D"sonar.projectKey=adh-portal" -Dsonar.exclusions=**/sonarscanner/**,**/styled.ts,**/Styled.ts,*.css,*.test.tsx,**/*.css,**/*.test.tsx,**/style/**,**/Style/**,**/*.scss,**/*.stories.tsx,**/*.jar,**/*.java,**/automation_scripts/**,**/src/pages/Dashboard/**,**/css/** -D"sonar.sources=." -"Dsonar.host.url=https://hb-shared-codequality.heartblr.org/" -D"sonar.login=b5765dbffd0fa6a419f6925e0b64f037d90306ef" -D"sonar.test=src/**/*.test.tsx" -D"sonar.test.inclusions=src/**/*.test.tsx" -D"sonar.javascript.lcov.reportPaths=coverage/lcov.info" 

