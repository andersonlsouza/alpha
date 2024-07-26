class Validator {
  constructor(public data: any) {
    this.data = data;
  }
}

class StringValidator extends Validator {
  constructor(data: any) {
    if (typeof data !== "string") {
      throw new Error("O tipo está errado");
    }
    super(data);
  }
}

abstract class RegexValidator extends StringValidator {
  protected _regex: RegExp = new RegExp("");

  constructor(data: any) {
    super(data);
    if (!this.regex.test(data)) throw new Error("O tipo está errado!");
  }

  protected get regex(): RegExp {
    return this._regex;
  }
}

/* Validações */

export class EmailValidator extends RegexValidator {
  constructor(data: any) {
    super(data);
  }

  protected get regex(): RegExp {
    return /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
  }
}

export class PasswordValidator extends RegexValidator {
  constructor(data: any) {
    super(data);
  }

  protected get regex(): RegExp {
    return /^\w{1,}$/gim;
  }
}

export class NameValidator extends RegexValidator {
  constructor(data: any) {
    super(data);
  }

  protected get regex(): RegExp {
    return /^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim;
  }
}
