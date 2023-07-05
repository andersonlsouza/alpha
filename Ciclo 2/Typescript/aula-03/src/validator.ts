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

class NumberValidator extends Validator {
  constructor(data: any) {
    if (typeof data !== "string") {
      throw new Error("O tipo está errado");
    }
    super(data);
  }
}

class BooleanValidator extends Validator {
  constructor(data: any) {
    if (typeof data !== "string") {
      throw new Error("O tipo está errado");
    }
    super(data);
  }
}

try {
  const stringValidator = new StringValidator("string");
  console.log(stringValidator.data);
} catch (error: any) {
  console.log(error.message);
}

class RegexValidator extends StringValidator {
  regex: RegExp = /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;

  constructor(data: any) {
    super(data);
    if (!this.regex.test(data)) throw new Error("O tipo está errado!");
  }
}

class EmailInput extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const input = document.createElement("input");
    input.type = "text";
    input.onchange = (e) => new RegexValidator(input.value);

    shadow.appendChild(input);
  }
}

customElements.define("email-input", EmailInput);
