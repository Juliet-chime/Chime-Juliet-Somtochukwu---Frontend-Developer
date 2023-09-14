
const padToLength = function (d, length) {
  return d.toString().padStart(length || 2, "0");
};


const parseDate = function (
  date,
  { separator, prepareDate, dMY = false, iso = false }
) {
  date = date ? new Date(date) : new Date();
  date = prepareDate ? prepareDate(date) : date;
  return `${dMY ? padToLength(date.getDate()) : date.getFullYear()}${separator || " "
    }${padToLength(iso ? date.getMonth() + 1 : date.getMonth())}${separator || " "
    }${dMY ? date.getFullYear() : padToLength(date.getDate())}`;
};

export { parseDate, padToLength }