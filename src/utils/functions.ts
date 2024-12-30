const convertFullName = (name: string, surname: string) => {
  return `${name} ${surname}`;
};
const formatPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/\s/g, '');
};
export {convertFullName, formatPhoneNumber};
