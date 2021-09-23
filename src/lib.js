const jwt = require('jsonwebtoken');
const core = require('@actions/core');
const github = require('@actions/github');

const decodeBase64 = function(base64String) {
  const buf = Buffer.from(base64String, 'base64').toString();
  return buf;
}

const getUnixTime = function() {
  const date = new Date();
  const unixTimestamp = Math.floor(date.getTime() / 1000);
  return unixTimestamp;
}

const generatePayload = function(githubAppID, unixTimestamp) {
  const payload = {
    "iat": unixTimestamp - 60,
    "exp": unixTimestamp + (10 * 60),
    "iss": githubAppID
  };
  return payload;
}

const encodeJWT = function(payload, privateKey) {
  const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
  return token;
}

// GET /orgs/{org}/installation
// ref: https://docs.github.com/en/rest/reference/apps#get-an-organization-installation-for-the-authenticated-app
const getInstallationIDByOrg = async function(jwt, orgName) {
  const octokit = github.getOctokit(jwt)
  const { data: installation } = await octokit.rest.apps.getOrgInstallation({org: orgName});
  return installation.id;
}

// GET /repos/{owner}/{repo}/installation
// ref: https://docs.github.com/en/rest/reference/apps#get-a-repository-installation-for-the-authenticated-app
const getInstallationIDByRepo = async function(jwt, ownerName, repoName) {
  const octokit = github.getOctokit(jwt)
  const { data: installation } = await octokit.rest.apps.getRepoInstallation({owner: ownerName, repo: repoName});
  return installation.id;
}

// GET /users/{username}/installation
// ref: https://docs.github.com/en/rest/reference/apps#get-a-user-installation-for-the-authenticated-app
const getInstallationIDByUser = async function(jwt, userName) {
  const octokit = github.getOctokit(jwt)
  const { data: installation } = await octokit.rest.apps.getUserInstallation({username: userName});
  return installation.id;
}

// POST /app/installations/{installation_id}/access_tokens
// ref: https://docs.github.com/en/rest/reference/apps#create-an-installation-access-token-for-an-app
const getAccessToken = async function(jwt, installationID) {
  const octokit = github.getOctokit(jwt)
  const { data: accessToken } = await octokit.rest.apps.createInstallationAccessToken({installation_id: installationID});
  return accessToken.token;
}

// main function
const main = async function() {
  try {
    const installationType = core.getInput('type');
    const pem = core.getInput('APP_PEM');
    const appID = core.getInput('APP_ID');
    console.log(`Hello ${pem}!`);
    console.log(`Hello ${appID}!`);

    console.log(github.context.payload.repository.full_name);
    const repoInfo = github.context.payload.repository.full_name.split('/');
    const orgName = repoInfo[0]
    const userName = repoInfo[0]
    const repoName = repoInfo[1]

    const privateKey = decodeBase64(pem);
    const currentUnixTime = getUnixTime();
    const payload = generatePayload(appID, currentUnixTime);
    const jwt = encodeJWT(payload, privateKey);

    var installationID = "";
    switch (installationType) {
      case 'org':
        installationID = await getInstallationIDByOrg(jwt, orgName);
      case 'user':
        installationID = await getInstallationIDByUser(jwt, userName);
      case 'repo':
        installationID = await getInstallationIDByRepo(jwt, userName, repoName);
      default:
        core.setFailed(`invalid input type: ${installationType}`);
    }

    const accessToken = await getAccessToken(jwt, installationID);

    core.setOutput("app_token", accessToken);
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = {
  decodeBase64: decodeBase64,
  getUnixTime: getUnixTime,
  generatePayload: generatePayload,
  encodeJWT: encodeJWT,
  getInstallationIDByOrg: getInstallationIDByOrg,
  getInstallationIDByRepo: getInstallationIDByRepo,
  getInstallationIDByUser: getInstallationIDByUser,
  getAccessToken: getAccessToken,
  main: main
};
