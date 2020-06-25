/**
 * Genera Ruts en formato CSV sin repetirse y con
 * digitos verificadores válidos.
 *
 */

const papa = require("papaparse");
const fs = require("fs");
const TARGET = 10;
const FILENAME = "runs.csv";

// Generates a new run
function generateRun() {
  // Obtains the verified digit of the run
  function getDv(T) {
    // This verification code was obtained from
    // https://gist.github.com/donpandix/f1d638c3a1a908be02d5
    var M = 0,
      S = 1;
    for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
    return S ? S - 1 : "k";
  }
  // Generates the random number.
  let run = "        "
    .split("")
    .map(() => {
      return Math.ceil(Math.random() * 9);
    })
    .join("");
  // Returns the full generated run.
  return run + "-" + getDv(run);
}

const runList = [];
for (let i = 0; i < TARGET; i++) {
  let run = generateRun();
  while (
    runList.some((r) => {
      return run === r[0];
    })
  )
    run = generateRun();
  runList.push(i === 0 ? ["Ruts", "Instituciones"] : [generateRun()]);
}

const csv = papa.unparse(runList);
fs.writeFile(FILENAME, csv, "utf-8", (error) => {
  if (error) console.error(error);
  else console.log("Archivo creado");
});
