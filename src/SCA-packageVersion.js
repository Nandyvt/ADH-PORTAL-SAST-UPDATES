/* eslint-disable no-console */
const { exec } = require("child_process");

// The array of packages you want to check
const packagesToCheck = ["axios", "cross-spawn", "postcss", "es5-ext"];

// Recursively traverse dependencies and collect versions for the packages we care about.
function flattenDependencies(deps, result = {}) {
  if (!deps) return result;
  Object.entries(deps).forEach(([pkg, info]) => {
    // If this package is one of the ones we want, record it.
    if (packagesToCheck.includes(pkg)) {
      // Save version if not already recorded
      if (!result[pkg]) {
        result[pkg] = info.version || "N/A";
      }
    }
    // Recurse into nested dependencies if available.
    if (info.dependencies) {
      flattenDependencies(info.dependencies, result);
    }
  });
  return result;
}

// Build the command using the packagesToCheck array
const command = `npm ls ${packagesToCheck.join(" ")} --json`;

exec(command, (error, stdout) => {
  if (error) {
    console.error("Error executing npm ls:", error);
    return;
  }
  let data;
  try {
    data = JSON.parse(stdout);
  } catch (err) {
    console.error("Error parsing JSON:", err);
    return;
  }
  const flattened = flattenDependencies(data.dependencies);
  const tableData = Object.entries(flattened).map(([pkg, version]) => ({
    package: pkg,
    version,
  }));
  console.table(tableData);
});
