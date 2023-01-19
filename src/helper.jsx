/**
 * Downloads given object as *.json file
 * @param {string} fileName the name to be assigned to the downloaded file
 * @param {object} object the object to be converted to *.json file and downloaded
 */
export function downloadAsJson(fileName, object) {
  const data = new Blob([JSON.stringify(object)], {type: "text/json"});
  const jsonURL = window.URL.createObjectURL(data);
  const link = document.createElement("a");
  document.body.appendChild(link);
  link.href = jsonURL;
  link.setAttribute("download", fileName);
  link.click();
  document.body.removeChild(link);
}

/**
 * Converts newline ("\n") tokens in text to HTML break-elements
 * @param {string} tekst the text containing newline tokens
 * @returns {*} an HTML span-element containing the text with break elements
 */
export function nl2br(tekst) {
  return tekst.split('\n').map((item, key) => {
    return <span key={key}>{item}<br/></span>
  });
}