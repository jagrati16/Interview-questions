const A = [
    [1, 2, 3],
    [4, 5, 5],
    [8, 9, 10],
  ];
  
  function printMarixDiagonally(A) {
    const n = A.length;
    const arr = [];
    for (let k = 0; k < n; k++) {
      arr.push(A[0][k]);
      let i = 1;
      let j = k - 1;
      while (i < n && j >= 0) {
        arr.push(A[i][j]);
        i++;
        j--;
      }
    }
  
    for (let k = 1; k < n; k++) {
      arr.push(A[k][n - 1]);
      let i = k + 1;
      let j = n - 2;
      while (i < n && j >= 0) {
        arr.push(A[i][j]);
        i++;
        j--;
      }
    }
    return arr;
  }
  