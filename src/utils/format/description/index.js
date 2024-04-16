//cant be empty
//cant include _ symbol
//cant be "  "
//should be unique
export const isDescriptionCorrect = (desc) => {
  let status = '';
  let correct = true;
  let result = desc;
  if (result === undefined) {
    status = 'undefined';
    correct = false;
  }
  if (result === null) {
    status = 'null';
    correct = false;
  }
  if (result.length === 0) {
    status = 'empty';
    correct = false;
  }
  if (result.length > 0) {
    result = result.replaceAll(/^ +/g, '').replaceAll(/ +$/g, '');
  }
  if (result.length === 0) {
    status = 'empty';
    correct = false;
  }
  if (result.length > 0 && result.includes('_')) {
    status = 'symbol';
    correct = false;
  }
  return {
    status,
    correct,
    result,
  };
};

//add category => prevDesc = null
export const isDescriptionUnique = (newDesc, prevDesc, data) => {
  if (newDesc === prevDesc) return true;
  const filtered = data.filter((value) => value.description === newDesc);
  return filtered.length ? false : true;
};
