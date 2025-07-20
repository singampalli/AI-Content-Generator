export function generatePrompt(templateBody, inputValues) {
  let output = templateBody;
  Object.keys(inputValues).forEach((key) => {
    const placeholder = `{${key}}`;
    const replacement = inputValues[key];
    output = output.replaceAll(placeholder, replacement);
  });
  return output;
}