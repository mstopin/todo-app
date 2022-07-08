export default class Config {
  static get(key: string) {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Key ${key} does not exist!`);
    }
    return value;
  }
}
