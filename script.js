//your JS code here. If required.
// Function to create a promise that resolves after a random time between 1 and 3 seconds
function createRandomPromise(promiseName) {
  return new Promise((resolve) => {
    const timeToResolve = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
    setTimeout(() => {
      resolve({ name: promiseName, time: timeToResolve });
    }, timeToResolve * 1000);
  });
}

// Create an array of promises
const promises = [
  createRandomPromise("Promise 1"),
  createRandomPromise("Promise 2"),
  createRandomPromise("Promise 3"),
];

// Add a loading row to the table
const output = document.getElementById("output");
const loadingRow = document.createElement("tr");
loadingRow.innerHTML = "<td colspan='2'>Loading...</td>";
output.appendChild(loadingRow);

// Use Promise.all to wait for all promises to resolve
Promise.all(promises).then((results) => {
  // Remove the loading row
  output.removeChild(loadingRow);

  // Calculate total time taken
  const totalTime = results.reduce((sum, result) => sum + result.time, 0);

  // Populate the table with results
  results.forEach((result) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${result.name}</td><td>${result.time.toFixed(3)}</td>`;
    output.appendChild(row);
  });

  // Add the total row
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `<td>Total</td><td>${totalTime.toFixed(3)}</td>`;
  output.appendChild(totalRow);
});