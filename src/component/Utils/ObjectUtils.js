export function toLowerObject(arrayOfObj) {
  let newArrayOfObj = [];
  for (let i = 0; i < arrayOfObj.length; i++) {
    let newObj = {};
    const keys = Object.keys(arrayOfObj[i]);
    for (let j = 0; j < keys.length; j++) {
      const key = keys[j];
      newObj[key.toLowerCase()] = arrayOfObj[i][key];
    }
    newArrayOfObj.push(newObj);
  }
  return newArrayOfObj;
}

