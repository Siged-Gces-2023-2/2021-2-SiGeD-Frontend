import styles from './Style';
import {
  validateName, validateEmail, validatePassword, confirmPassword,
  validateStringTel, validateStringCpf,
} from '../../Utils/validations';

export function ErrorMessage({ input, title }) {
  switch (title) {
    case 'Nome':
      if (input && !validateName(input)) {
        return (
          <p style={styles.text}>Nome Inválido, ele deve possuir entre 2 a 50 letras!</p>
        );
      }
      break;

    case 'E-mail':
      if (input && !validateEmail(input)) {
        return (
          <p style={styles.text}>Email Inválido</p>
        );
      }
      break;

    case 'Senha':
      if (input && !validatePassword(input)) {
        return (
          <p style={styles.text}>Senha Inválida</p>
        );
      }
      break;

    case 'CPF':
      if (input && !validateStringCpf(input)) {
        return (
          <p style={styles.text}>CPF Inválido, ele deve possuir 11 números!</p>
        );
      }
      break;

    case 'telefone':
      if (input && !validateStringTel(input)) {
        return (
          <p style={styles.text}>Telefone Inválido, ele deve possuir mais de 10 numeros!</p>
        );
      }
      break;

    default:
      break;
  }

  return '';
}

export const PassMatches = ({ pass, confPass }) => {
  if (confPass && !confirmPassword(pass, confPass)) {
    return (
      <p style={styles.passwords}>Senhas não correspondem</p>
    );
  }
  return '';
};
