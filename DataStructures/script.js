//Find the smallest window in a string containing all characters of another string
// str1 = geeksforgeeks
// patt = kesk
const findSubstring = (str1, patt) => {
  const len1 = str1.length;
  const len2 = patt.length;
  if (len1 < len2) {
    return null;
  }

  const map2 = {};
  for (let i = 0; i < len2; i++) {
    const v = patt[i];
    if (!map2[v]) {
      map2[v] = 0;
    }
    map2[v]++;
  }

  console.log(map2);

  const map1 = {};
  let start = 0;
  let start_index = null;
  let min_len = Number.POSITIVE_INFINITY;
  let count = 0;
  for (let i = 0; i < len1; i++) {
    const c = str1[i];

    if (!map1[c]) {
      map1[c] = 0;
    }
    map1[c]++;

    if (map2[c] && map1[c] <= map2[c]) {
      count++;
    }

    if (count === len2) {
      while (
        !map2[str1[start]] ||
        map2[str1[start]] === 0 ||
        map1[str1[start]] > map2[str1[start]]
      ) {
        if (map1[str1[start]] > map2[str1[start]]) {
          map1[str1[start]]--;
        }
        start++;
      }
     
      let len_window = i - start + 1;
      if (len_window < min_len) {
        min_len = len_window;
        start_index = start;
      }
      console.log("start", start, min_len)
    }
  }

  console.log(start_index, min_len);
  let result = "";
  for (let i = 0; i < min_len; i++) {
    result += str1[start_index + i];
  }
  console.log(result);
};

findSubstring("this is a test string", "tist");
