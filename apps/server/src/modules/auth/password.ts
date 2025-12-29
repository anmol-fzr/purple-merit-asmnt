import bcrypt from "bcrypt";

export class Password {
  private saltRound = 10;

  private genSalt() {
    return bcrypt.genSalt(this.saltRound);
  }

  async hash(rawPass: string) {
    const salt = await this.genSalt();
    const hash = await bcrypt.hash(rawPass, salt);
    return hash;
  }

  compare(rawPass: string, hashPass: string) {
    return bcrypt.compare(rawPass, hashPass);
  }
}
