const fs = require('fs').promises;
const path = require("path");
const lib = require('../src/lib');

const base64PEMString = 'LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFb3dJQkFBS0NBUUVBNmRCYWhON25jNEp0eEZHcC9JcG84eEJ4blV4QTJSSXJMK1Mzakg1bi9MR24wZ2ptCmt3S2lrY1RFM0hqa1B0OU85TmV2TFdZVW5ydlZObkZycVEwek5rMURNTHV6Yi8rZVF5Z1c1T1k3U2hqUUptK3IKdDZXZ3puZ2c4bjhYeUE3Nll4SThXV0R1QkdidWkyR2VYbCt2VUMrbWorVkQ2VHphNjBFMEp4TjduNklERURGaApUdTlZZWJUSGZLajFUQjdLRDd5NlZNT2RlZGxaL0FHZ1FIYjNiWktzNFRnVUZldDVCK1RVYUpGeUZFZ1lZdm5oCkJibUgvY2U1RHpBeEpEaC9OOWM4QWwveTN5c3J1RWU2aGRURWdCNHVnYzFzQ1BwUE5pVWE1VTF5SmFRVllHL0MKQXB2dmpSTlZwUisya1JvZFY2L0l2bW1JbUcwQkdpeXo4VjBPalFJREFRQUJBb0lCQUNqUVpmeXJyRnROZVR1Nwp4YUIveUxJbFBLL29qNmxVc3BVNXA1Q3V3QmdzS3M5UEhuQ3JGUlc4ODJCSStnNi9qRmpSRFpNdkxvcEczNEVSCmEybW5GRGwyWXpRdWo3UU5PdU1lTEdEb2o1RHZvK1lSdURmbWdadUkvTGRYMkI3ai9uRXN6YndNWDRBRk43NjgKMjVnOXU2eVRwTStaaGJGQkhqWFN1L2ZXUHM0dWRFSjZzUTlCaGt0UzQ1Uk8zM2IvMlFRZmljUGVYSHFiUkMwYwpESkI1azBtVnUxL3VxWFBKQXdPRzNjLzVONExtZi9MY2VHVCtKcE1ITkpUREhsTVBoVVZOckJmdDMzaVE5WmRYCndWYTdUM2ZaMmUybThRaDNMREtIT3ZKcVlla2Exa2I4TzE1dStsemlUSEZTZm05OVFYeitEa1F3ZUozcS8wV3AKcEFySlhnRUNnWUVBL1lZbVNkaXRyTElzR0IwbW1zamF3eEU4eHNMeEcwMjlUUGQrYjZ2K01BYjNpM1ZxT0JXTgpLc2dqdTNTN2oyQmZBR041cjA3S1doZHROb1M4bzAvQ0VIanJ4OWRacE1BZ1VNTi9ZVHhoWWwzNU9SMHFucXU0CklIT1hQdVViVUhMbmZEc1ovWnBHdmpVRWwxVkxHamxkYkVQVlA2M1pKM1BaQ2t2SmwvcGljSVVDZ1lFQTdCanMKNzlyTytTL2diZ3hqZWo5QXpmb0RDc1FmMW5neS9pYUZlc1crZzAxWFdZSEhOR0lQQnJmVjFYek82azc4dU9oTwo0L3liSTMxL044emYrTDhIUU03M1BPZDlYaGJNUFR0Z1VvU2FSV3RWbk1ueFBpa29xRWJ6OVRTMWI2eGRYM1hXCm5CRjBnT3dBN2RtelVYZXpBTEVMVmRDQXNuUlhLT3JVdjlsUnlHa0NnWUFSdDZKTlh0c2tTbjlTWUJjbWtnclgKdndpa1MxTldPU1NWa0daQm41OXY4OHl3N2sreUE2K040ZGE5YnZiOG1odUpoMm9sbWpnQis4a2lHanlrblJwTwoxR1NGM3NMaEJKdzlpS3dLTzVJQ3NkYU02MERqUGRUc1Q2ZXVPWXlqSHFTV3hmcVhBb1VYSGRWb1RnbWxsNFN6CjREbXk3WTlUZG9FZ2V4Tm5qNVA1a1FLQmdRRGoxeVlJVGtPQXJGaE1PejVnd2R2N0tyTjIxMC9XUEFjUnh3RDMKT3crZ1RLbm9JZHFvelp5c29nb0V6VDR0VmU2RFR3U2E5YktOYkZXeDlzK0prR2dpZmRpUWVPRStSSWZ5NjNNSQpEeG1GdHBCWEQzYjB3dW1PZzNKNGh0WTFIOFM0RTlMNHA4dWpncDFlNjhFbDlIclZSd1dtV2VGbzFlY3JBSHd4CmJEcUZTUUtCZ0QwUzhoOEdndzFIWGd0WVlNbm9IQ0hJRS8yQTlPZjNCMTBISzdoY0ZhRHlwTUxHbFc5bjdvbEUKQkhrTHRQR09ySGJzTEd5Z2t5YWQxTWJOMUJ5eUozZUpiNVBsZnVTU0psRTdzcnNuTlBCdG9mSkJaU0FNZmpHcgovZ3pqUSt6eDFoaHFLNk00dmV3MzZuSzBOMUNJT0k0MVBjWDZkaDdhV1FxY2pxQWZxRE4zCi0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0tCg==';

test('check pem decode', async () => {
  const privateKey = await fs.readFile('./tests/rsa_private_key.pem', 'utf8');
  const result = lib.decodeBase64(base64PEMString);
  expect(result).toBe(privateKey);
});


test('check payload', () => {
  const currentUnixTime = lib.getUnixTime();
  const appID = "139965";
  const payload = lib.generatePayload(appID, currentUnixTime);
  expect(payload.iss).toBe(appID);
  expect(payload.iat).toBe(currentUnixTime - 60);
  expect(payload.exp).toBe(currentUnixTime + (10 * 60));
});


test('check eocodeJWT', () => {
  const expectedJWT = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzIzNzA1OTcsImV4cCI6MTYzMjM3MTI1NywiaXNzIjoiMTExMTExIn0.RpSC9S8oAOGG8wYcd19wi_150BVGeGIekewYPRORxfsaAmo5NkFZP1fXZjVTLrF3bWP4juEUWG_W6KqUudFWrTofmwt1XaUr1pd2nSx3wHr_NsWJ-ia--P1vBVzT1TJmntwlLtECDPNP041zsiULPZhViERVO3f7cnLRY15Itw5BsRTKo7MeRpTFHJaelbLanhVh7P445ZEuSUDb5oc6gcADAayaWfS4n4cr-TuXrefavkJPUaDL3CkRHtaDlFaWHjAPUx2WZHopcjElgT3GOYDB7TOWg05ahuvNnP_OvTuIPgVEXp0BYggSax6vr3lDIjaXrGT-4T8MLICn0fSM9w';

  const privateKey = lib.decodeBase64(base64PEMString);
  const currentUnixTime = 1632370657;
  const appID = "111111";
  const payload = lib.generatePayload(appID, currentUnixTime);
  const jwt = lib.encodeJWT(payload, privateKey);
  expect(jwt).toBe(expectedJWT);
});

// test('check setGitProtocolAsHTTPS', async () => {
//   const homeDir = process.env["HOME"];
//   const gitConfigPath = path.join(homeDir, ".gitconfig")
//   lib.setGitProtocolAsHTTPS();
//   const gitConfig = await fs.readFile(gitConfigPath, 'utf8');
//   expect(gitConfig).toBe('aaaaa');
// });
//
// test('check saveAccessToken', async () => {
//   const homeDir = process.env["HOME"];
//   const gitCredentialsPath = path.join(homeDir, ".git-credentials")
//   const testAccessToken = 'aaaaa';
//   lib.saveAccessToken(testAccessToken);
//   const gitCredentials = await fs.readFile(gitCredentialsPath, 'utf8');
//   expect(gitCredentials).toBe(`https://x-access-token:${testAccessToken}@github.com`);
// });
