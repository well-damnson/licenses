import CryptoJS from 'crypto-js';

function randomString(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
// async function debugTest() {
//   let uuid = await machineId(true);
//   let secret = randomString(10);
//   let license = encrypt(uuid, secret);
//   let decrypted = decrypt(license, secret);
//   let toConsole = {uuid, secret, license, decrypted};
//   return toConsole;
// }

function encrypt(data, secret, type = 'AES') {
  let result = CryptoJS[type].encrypt(data, secret).toString();
  return result;
}

function decrypt(data, secret, type = 'AES') {
  let result = CryptoJS[type].decrypt(data, secret).toString(CryptoJS.enc.Utf8);
  return result;
}

function isValidIpv4Addr(ip) {
  return /^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/.test(
    ip,
  );
}

function isValidUUID(uuid) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
    uuid,
  );
}

export { randomString, encrypt, decrypt, isValidIpv4Addr, isValidUUID };
