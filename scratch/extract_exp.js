const fs = require("fs");
const path = require("path");
const os = require("os");

const logFile = path.join(
  os.homedir(),
  ".gemini",
  "antigravity-ide",
  "brain",
  "0af035f1-b92b-401a-9334-b8aa9905913a",
  ".system_generated",
  "logs",
  "transcript_full.jsonl"
);

if (!fs.existsSync(logFile)) {
  console.error("Log file not found at " + logFile);
  process.exit(1);
}

const lines = fs.readFileSync(logFile, "utf-8").split("\n");
for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const obj = JSON.parse(line);
    if (obj.step_index === 499 && obj.tool_calls && obj.tool_calls.length > 0) {
      const call = obj.tool_calls[0];
      if (call.name === "replace_file_content") {
        console.log("FOUND STEP 499 CONTENT:");
        console.log(call.args.ReplacementContent);
        process.exit(0);
      }
    }
  } catch (e) {}
}

console.error("Step 499 replace_file_content tool call not found in log.");
