export const getFormatedUserFullName = (firstName, lastName) => {
    const fullName = firstName + ' ' + lastName;
    return fullName.length > 22
    ? fullName.slice(0, 22) + ".."
    : fullName.trim();
}