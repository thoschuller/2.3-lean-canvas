// Download 'object' als JSON-bestand met de naam 'fileName'

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

// Zet newlines om in 'br' elementen
export function nl2br(tekst) {
    return tekst.split('\n').map((item, key) => {
        return <span key={key}>{item}<br/></span>
    });
}