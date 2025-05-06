"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-inscricao");
  const resetButton = document.querySelector("#limpar");

  const iconError = '<i class="fa-solid fa-circle-exclamation"></i>';

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let formIsValid = true;

    const fields = [
      {
        id: "inome",
        validator: isValidName,
        errorMessage: "O nome é obrigatório!"
      },
      {
        id: "isobrenome",
        validator: isValidSurname,
        errorMessage: "O sobrenome é obrigatório!"
      },
      {
        id: "iemail",
        validator: isValidEmail,
        errorMessage: "O email é obrigatório!"
      },
      {
        id: "itel",
        validator: isValidTelephone,
        errorMessage: "O telefone é obrigatório!"
      },
      {
        id: "idata",
        validator: isValidDate,
        errorMessage: "A data de nascimento é obrigatória!"
      },
      {
        id: "isenha",
        validator: isValidPassword,
        errorMessage: "A senha é obrigatória!"
      },
      {
        id: "isenhaConfirmar",
        validator: (val) => passwordConfirm(document.querySelector("#isenha").value, val),
        errorMessage: "A confirmação da senha é obrigatória!"
      }
    ];

    fields.forEach(({ id, validator }) => {
      const input = document.querySelector(`#${id}`);
      const value = input.value.trim();
      const inputBox = input.closest(".input-box");
      let errorSpan = inputBox.querySelector(".error");

      if (!errorSpan) {
        errorSpan = document.createElement("span");
        errorSpan.classList.add("error");
        inputBox.appendChild(errorSpan);
      }

      const validation = validator(value);

      if (!validation.isValid) {
        formIsValid = false;
        errorSpan.innerHTML = `${iconError} ${validation.errorMessage}`;
        input.classList.add("invalid");
      } else {
        errorSpan.innerHTML = "";
        input.classList.remove("invalid");
      }
    });

    if (formIsValid) {
      alert("Inscrição enviada com sucesso!");
      form.submit(); // ou use AJAX
    }
  });

  resetButton.addEventListener("click", () => {
    const errors = document.querySelectorAll(".error");
    errors.forEach((err) => (err.innerHTML = ""));
    const invalids = document.querySelectorAll(".invalid");
    invalids.forEach((el) => el.classList.remove("invalid"));
  });
});

// EXPRESSÕES REGULARES E VALIDAÇÕES

function regularExpressions() {
  return {
    letras: /^[a-zA-Z\s]+$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    telefone: /^(?:\(\d{2}\)\s?)?\d{4,5}-\d{4}$/,
    senha: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/
  };
}

function isEmpty(value) {
  return value === "";
}

function isValidName(value) {
  const validator = { isValid: true, errorMessage: "" };
  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = "O nome é obrigatório.";
  } else if (value.length < 3) {
    validator.isValid = false;
    validator.errorMessage = "O nome deve ter pelo menos 3 caracteres.";
  } else if (!regularExpressions().letras.test(value)) {
    validator.isValid = false;
    validator.errorMessage = "O nome deve conter apenas letras.";
  }
  return validator;
}

function isValidSurname(value) {
  const validator = { isValid: true, errorMessage: "" };
  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = "O sobrenome é obrigatório.";
  } else if (value.length < 3) {
    validator.isValid = false;
    validator.errorMessage = "O sobrenome deve ter pelo menos 3 caracteres.";
  } else if (!regularExpressions().letras.test(value)) {
    validator.isValid = false;
    validator.errorMessage = "O sobrenome deve conter apenas letras.";
  }
  return validator;
}

function isValidEmail(value) {
  const validator = { isValid: true, errorMessage: "" };
  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = "O email é obrigatório.";
  } else if (!regularExpressions().email.test(value)) {
    validator.isValid = false;
    validator.errorMessage = "Formato de email inválido.";
  }
  return validator;
}

function isValidTelephone(value) {
  const validator = { isValid: true, errorMessage: "" };
  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = "O telefone é obrigatório.";
  } else if (!regularExpressions().telefone.test(value)) {
    validator.isValid = false;
    validator.errorMessage = "Formato de telefone inválido. Ex: (43) 99999-9999";
  }
  return validator;
}

function isValidDate(value) {
  const validator = { isValid: true, errorMessage: "" };
  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = "A data de nascimento é obrigatória.";
  } else {
    const ano = new Date(value).getFullYear();
    const anoAtual = new Date().getFullYear();
    if (ano < 1920 || ano > anoAtual) {
      validator.isValid = false;
      validator.errorMessage = "Ano de nascimento inválido.";
    }
  }
  return validator;
}

function isValidPassword(value) {
  const validator = { isValid: true, errorMessage: "" };
  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = "A senha é obrigatória.";
  } else if (!regularExpressions().senha.test(value)) {
    validator.isValid = false;
    validator.errorMessage = `
      A senha deve conter pelo menos:<br>
      - 8 caracteres<br>
      - 1 letra maiúscula<br>
      - 1 letra minúscula<br>
      - 1 número<br>
      - 1 caractere especial
    `;
  }
  return validator;
}

function passwordConfirm(password, confirmation) {
  const validator = { isValid: true, errorMessage: "" };
  if (isEmpty(confirmation)) {
    validator.isValid = false;
    validator.errorMessage = "Confirme sua senha.";
  } else if (password !== confirmation) {
    validator.isValid = false;
    validator.errorMessage = "As senhas não coincidem.";
  }
  return validator;
}
