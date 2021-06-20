// function to tell winner and which player is the winner.
// column, rows, diagonal
// 3 * 3 matrix
// ['x', 'x', 'x', 'x'
//  'x', 'x', 'x', '0'
//  '',  'x', 'x', '0',
//  '', '',   'x', 'x' ] 4 * 4
//const winningConditions = [[0,1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], []];

// all rows
// all columns
// N * N matrix, M would be the number you need to make for a winning condition (M<=N)

//currentPlayer = 'x' || 'o'
function validateIsGameOver(matrix, m, currentPlayer) {
  const n = matrix.length;
  const [i, j] = position;

  /** checking each row */
  for (let i = 0; i < n; i++) {
    let count = 0;
    for (let j = 0; j < n; j++) {
      count = matrix[i][j] === currentPlayer ? count + 1 : 0;
      if (count === m) {
        return true;
      }
    }
  }
  let count = 0;
  for (let i = 0; i < n; i++) {
    count = matrix[i][i] === currentPlayer ? count + 1 : 0;
  }
}

// 		<form id="extra" >
// 			<input type="text" name="payment.voucher.test" />
//          <input type="text" name="payment.voucher" />
// 		</form>
// 	</body>
// </html>

/** {street.name : "test", street.number: "test2"} */
// contact.phone.subscriber
// { contant: { phone: { subsriber : value }} }

function addPathToObj(path, value, res) {
  const [firstKey, ...restKeys] = path.split("."); // [subsriber]
  if (restKeys.length === 0) {
    res[firstKey] = value;
  } else {
    if (res[firstKey] === undefined) {
      res[firstKey] = {};
    }
    addPathToObj(restKeys.join("."), value, res[firstKey]);
  }
}

function test(formId) {
  const elm = document.getElementById(formId);
  const valuesMap = {};
  for (let i = 0; i < elm.children.length; i++) {
    const childElm = children[i];
    const name = childElm.getAttribute("name");
    const value = childElm.getAttribute("value");
    valuesMap[name] = value;
  }
  const result = {};
  Object.keys(valuesMap).forEach((path, value) => {
    addPathToObj(path, value, res);
  });
  return result;
}
