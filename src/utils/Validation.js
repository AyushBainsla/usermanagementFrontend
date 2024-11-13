import moment from 'moment/moment';

const empty = (value) => {
  const val = value ? value.toString().trim() : value || value === 0;
  return !val;
};

const email = (value) => {
  const re =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
};

const participantPhone = (value) => {
  const reUSPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return !empty(value) && reUSPhone.test(value);
};

const participnatName = (value) => {
  const reFname = /^[a-zA-Z]{2,30}$/;
  return !empty(value) && reFname.test(value);
};

const participantLastName = (value) => {
  const reLname = /^[a-zA-Z]{2,15} {0,1}[a-zA-Z]{0,15}$/;
  return !empty(value) && reLname.test(value);
};

const minOf = (value, min) => {
  return !empty(value) && value.length >= min;
};

const maxOf = (value, max) => {
  return !empty(value) && value.length < max;
};

const maxOfEmpty = (value, max) => {
  return value.length < max;
};

const password = (value) => {
  if (!value) return 'Password cannot be empty';
  if (value.length < 8) return 'Password must be at least 8 characters long';

  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumbers = /[0-9]/.test(value);
  const hasSpecialChar = /[#!@$^&*_-]/.test(value);
  const hasThreeNumbers = (value.match(/\d/g) || []).length >= 3;

  if (!hasUpperCase) return 'Password must contain at least one capital letter';
  if (!hasLowerCase)
    return 'Password must contain at least one lowercase letter';
  if (!hasThreeNumbers)
    return 'Password must contain at least three numeric digits';
  if (!hasSpecialChar)
    return 'Password must contain at least one special character';

  return true; // If all conditions pass
};

const numericPhone = (value) => {
  const reNum = /^[0-9]*$/;
  return !empty(value) && value.length == 10 && reNum.test(value);
};
const organizationName = (value) => {
  const reFname = /^[a-zA-Z]{2,30}$/;
  return !empty(value) && reFname.test(value);
};

const date = (value) => {
  return moment(value).isValid();
};

const truncateString = (value) => {
  return value && value?.length > 25
    ? value?.substring(0, 25) + '...'
    : value
      ? value
      : '-';
};

const smallTruncateString = (value) => {
  return value && value?.length > 15
    ? value?.substring(0, 15) + '...'
    : value
      ? value
      : '-';
};

const hasSpecialCharacter = (value) => {
  if (Array.isArray(value)) {
    const reSpecialChar = /[0-9!@#$%^*,.?":{}|<>]/;
    return value.some((item) => reSpecialChar.test(item));
  } else {
    const reSpecialChar = /[!@#$%^*,.?":{}|<>]/;
    return !empty(value) && reSpecialChar.test(value);
  }
};

const specialAlphaNum = (value) => {
  const alphaNum = /^(?!.*  )[a-zA-Z0-9 ]+$/;

  return !empty(value) && alphaNum.test(value);
};

const onlyTextWithSpaces = (value) => {
  const reTextWithSpaces = /^[a-zA-Z\s]+$/;
  return !empty(value) && reTextWithSpaces.test(value);
};

const Validation = {
  empty,
  email,
  numericPhone,
  maxOf,
  maxOfEmpty,
  password,
  participantPhone,
  participnatName,
  participantLastName,
  minOf,
  date,
  organizationName,
  specialAlphaNum,
  truncateString,
  smallTruncateString,
  hasSpecialCharacter,
  onlyTextWithSpaces,
};
export default Validation;
