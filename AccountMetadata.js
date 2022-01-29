module.exports = class AccountMetadata {
  hacker = false;
  banned = false;

  constructor(hacker, banned) {
    this.hacker = hacker;
    this.banned = banned;
  }
};