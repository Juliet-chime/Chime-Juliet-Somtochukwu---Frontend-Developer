
const sortData = function (
    data = [],
    { condition = "date", ascending = true } = {}
  ) {
    if (data && data.length === 0) {
      return [];
    }

    return [...data].sort((tx1, tx2) => {
      if (condition === "date") {
        return !ascending
          ? new Date(tx2.original_launch).getTime() -
              new Date(tx1.original_launch).getTime()
          : new Date(tx1.original_launch).getTime() -
              new Date(tx2.original_launch).getTime();
      }
    });
  };

  function capitalizeFLetter(str) {
    if(!str) return

    return str[0]?.toUpperCase() + str.slice(1)?.toLowerCase()
  }

  export {sortData,capitalizeFLetter}