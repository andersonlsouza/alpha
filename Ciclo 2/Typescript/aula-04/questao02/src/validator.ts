import { create, connect, edit } from "./service.js";

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

class EmailValidator extends RegexValidator {
  constructor(data: any) {
    super(data);
  }

  protected get regex(): RegExp {
    return /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
  }
}

class PasswordValidator extends RegexValidator {
  constructor(data: any) {
    super(data);
  }

  protected get regex(): RegExp {
    return /^\w{1,}$/gim;
  }
}

class NameValidator extends RegexValidator {
  constructor(data: any) {
    super(data);
  }

  protected get regex(): RegExp {
    return /^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim;
  }
}

class EmailInput extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Email";
    input.onchange = () => {
      try {
        new EmailValidator(input.value);
      } catch (error) {
        input.value = "";
      }
    };

    shadow.appendChild(input);
  }
}

class PasswordInput extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Password";
    input.onchange = () => {
      try {
        new PasswordValidator(input.value);
      } catch (error) {
        input.value = "";
      }
    };

    shadow.appendChild(input);
  }
}

class NameInput extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Name";
    input.onchange = () => {
      try {
        new NameValidator(input.value);
      } catch (error) {
        input.value = "";
      }
    };

    shadow.appendChild(input);
  }
}

class ButtonNewUser extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const button = document.createElement("button");
    button.innerText = "Cadastrar";

    button.onclick = () => {
      const emailInput = document.querySelector(
        "email-input"
      ) as HTMLInputElement;
      const passwordInput = document.querySelector(
        "password-input"
      ) as HTMLInputElement;
      const nameInput = document.querySelector(
        "name-input"
      ) as HTMLInputElement;
      if (
        emailInput.shadowRoot &&
        passwordInput.shadowRoot &&
        nameInput.shadowRoot
      ) {
        let email = emailInput.shadowRoot.querySelector("input")?.value || "";
        let password =
          passwordInput.shadowRoot.querySelector("input")?.value || "";
        let name = nameInput.shadowRoot.querySelector("input")?.value || "";

        if (
          email &&
          email !== "" &&
          password &&
          password !== "" &&
          name &&
          name !== ""
        ) {
          create({ email, password, name });
        }
      }
    };

    shadow.appendChild(button);
  }
}

class ButtonLogin extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const button = document.createElement("button");
    button.innerText = "Entrar";

    button.onclick = () => {
      const emailInput = document.querySelector(
        "email-input"
      ) as HTMLInputElement;
      const passwordInput = document.querySelector(
        "password-input"
      ) as HTMLInputElement;
      const nameInput = document.querySelector(
        "name-input"
      ) as HTMLInputElement;
      if (
        emailInput.shadowRoot &&
        passwordInput.shadowRoot &&
        nameInput.shadowRoot
      ) {
        const email = emailInput.shadowRoot.querySelector("input")?.value;
        const password = passwordInput.shadowRoot.querySelector("input")?.value;
        const name = nameInput.shadowRoot.querySelector("input")?.value;

        if (
          email &&
          email !== "" &&
          password &&
          password !== "" &&
          name &&
          name !== ""
        ) {
          connect({ email, password, name });
        }
      }
    };

    shadow.appendChild(button);
  }
}

class ButtonEdit extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const button = document.createElement("button");
    button.innerText = "Editar";

    button.onclick = () => {
      const emailInput = document.querySelector(
        "email-input"
      ) as HTMLInputElement;
      const passwordInput = document.querySelector(
        "password-input"
      ) as HTMLInputElement;
      const nameInput = document.querySelector(
        "name-input"
      ) as HTMLInputElement;
      if (
        emailInput.shadowRoot &&
        passwordInput.shadowRoot &&
        nameInput.shadowRoot
      ) {
        const email = emailInput.shadowRoot.querySelector("input")?.value;
        const password = passwordInput.shadowRoot.querySelector("input")?.value;
        const name = nameInput.shadowRoot.querySelector("input")?.value;

        if (
          email &&
          email !== "" &&
          password &&
          password !== "" &&
          name &&
          name !== ""
        ) {
          edit({ email, password, name });
        }
      }
    };

    shadow.appendChild(button);
  }
}

customElements.define("email-input", EmailInput);
customElements.define("password-input", PasswordInput);
customElements.define("name-input", NameInput);
customElements.define("button-new-user", ButtonNewUser);
customElements.define("button-login", ButtonLogin);
customElements.define("button-edit", ButtonEdit);
