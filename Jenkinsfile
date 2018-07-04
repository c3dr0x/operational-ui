#!/usr/bin/env groovy
def label = "jenkins-node-${UUID.randomUUID().toString()}"

env.K8sCloud = "kubernetes"
env.GcpProject = "dev-and-test-env"
env.GcrRegion = "eu.gcr.io"
env.GcrPrefix = "${env.GcrRegion}/${env.GcpProject}"
env.BranchLower = env.BRANCH_NAME.toLowerCase()
// env.NpmRegistry = "npm.contiamo.com"
env.NpmRegistry = "registry.npmjs.com"
env.NpmEmail = "contiamo@contiamo.com"

/////// List all the downstream projects here:///////
def downstreamProjects = ["labs-ui","pantheon-ui"]
////////////////////////////////////////////////////
def triggerJob(job,branch){
  println "Triggering ${job}/${branch}"
  build job: "../${job}/${branch}", wait: false
}
def npmLogin(registry,user,pass,email){
  sh """
  #!/bin/bash
  sed s/REGISTRY_PLACEHOLDER/${registry}/g -i /usr/local/bin/npm-login.sh
  npm config set registry https://${registry}  
  /usr/local/bin/npm-login.sh ${user} ${pass} ${email}
  npm config set //$registry/:always-auth=true
  cat ~/.npmrc
  """
}
def npmPublish(tag,registry){
  sh """
  #!/bin/bash
  npm --registry https://${registry} whoami
  npm version prerelease
  until npm run publish -- --canary --npm-tag=${tag} --skip-git --yes --registry https://${registry}; do echo "Incrementing version..."; npm version prerelease; sleep 1; done
  """
}
def buildWebsite(dir,command){
  sh "cd ${dir} && yarn ${command} && cd -"
}

podTemplate(cloud: "${env.K8sCloud}", label: label, containers: [
  containerTemplate(name: 'node', image: "${env.GcrPrefix}/node:10.0.0-v0.5", ttyEnabled: true, resourceRequestMemory: '10Gi', resourceRequestCpu: '3', privileged: true),
  ],
  volumes: [
      hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
      hostPathVolume(mountPath: '/tmp', hostPath: '/tmp'),
      secretVolume(secretName: 'jenkins-git-credentials', mountPath: '/home/jenkins/git'),
  ],
  envVars: [
    envVar(key: 'GIT_AUTHOR_EMAIL', value: 'jenkins-x@googlegroups.com'),
    envVar(key: 'GIT_AUTHOR_NAME', value: 'jenkins-x-bot'),
    envVar(key: 'GIT_COMMITTER_EMAIL', value: 'jenkins-x@googlegroups.com'),
    envVar(key: 'GIT_COMMITTER_NAME', value: 'jenkins-x-bot'),
    envVar(key: 'JENKINS_URL', value: 'http://jenkins:8080'),
    envVar(key: 'XDG_CONFIG_HOME', value: '/home/jenkins'),
    secretEnvVar(key: 'NPM_PASS', secretName: 'npm-registry-creds', secretKey: 'password'),
    secretEnvVar(key: 'NPM_USER', secretName: 'npm-registry-creds', secretKey: 'username')
  ]
)
{
  node(label){
    stage('Git Checkout'){
      checkout scm
      checkout ([ $class: 'GitSCM', branches: [[name: "*/${env.BranchLower}"]],         
        extensions: [[$class: 'LocalBranch', localBranch: env.BranchLower]], 
      ])
    }
    container('node') {
      stage ('YARN Install'){
        try {
          sh "yarn install"
        } catch(e) {
          error("Failed while running npm install. Error: ${e}")
        }
      }      
      stage ('Yarn Verify'){
        try {
          sh """            
          #!/bin/bash
          yarn verify
          """
        } catch(e) {
          error("Failed while running LERNA. Error: ${e}.")          
        }     
      }      
      stage ('NPM Publish Next Tag') {
        npmLogin(env.NpmRegistry,"\${NPM_USER}","\${NPM_PASS}",env.NpmEmail)
        try {
          npmPublish("next",env.NpmRegistry)
        } catch(e) {
          println("Error publishing artefacts. Error: ${e}. Trying again...")
          npmPublish("next",env.NpmRegistry)
        }
      }
      stage ('Build Website'){
        sh "rm -rf dist"
        parallel (
          website: {
            buildWebsite("packages/website","build")
          },
          visual_tests:{
            buildWebsite("packages/visual-tests","build")
          },
          conponents:{
            buildWebsite("packages/components","docs:build")
          }
        )
        sh "mv packages/website/dist ."
        sh "mv packages/visual-tests/dist ./dist/visual-tests"
        sh "cp -r packages/components/styleguide ./dist/docs"
      }
      stage ('Deploy Website'){
        sh """
        #!/bin/bash
        git rev-parse --verify HEAD > /tmp/commit.txt
        git branch -D jenkins-gh-pages || true
        git checkout --orphan jenkins-gh-pages
        rm -rf scripts packages
        mv dist/* .
        rm -rf dist
        """
        withCredentials([ usernamePassword( credentialsId: '7e32a467-529a-44d7-a5b9-b6e77a86250a', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
          sh('git add .')
          sh('git add -f docs/build')
          sh('git commit -m \"Deploy Commit: \$(cat /tmp/commit.txt)\" --no-verify')
          sh('git push -f https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/contiamo/operational-ui.git jenkins-gh-pages')
        }
      }
      stage ('Trigger Downstream') {
        // Triggering downstream projects:
        if (env.BranchLower == 'jenkins-next') {
          downstreamProjects.each {
            triggerJob("${it}","jenkins-pipeline" )
          }
        } 
      }
    }
  }
}