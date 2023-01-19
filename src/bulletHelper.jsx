/**
 * Eventhandler for the create bullet and remove bullet buttons, opens respective dialogs
 * @param elementId {string} id of the canvas element the bullet belongs to
 * @param naamOfBullId {string} the name of the canvas element in case of bullet creation, or the id of the bullet in case of bullet removal
 * @param canvas {Object} the main canvas object containing the state with all data
 * @param add {boolean} true when method is used for creating a bullet, false when used for removing a bullet
 */
export function modifyBullet(elementId, naamOfBullId, canvas, add) {
    const dialog = document.getElementById(add ? "bulletDialog" : "removalDialog"); //zoek het juiste dialog-id afhankelijk van toevoegen/verwijderen
    let newBulletModifier = { ...canvas.state.bulletModifier, elementId: elementId, naamOfBullId: naamOfBullId };
    canvas.setState({ bulletModifier: newBulletModifier }, () => {
        dialog.showModal();
        if(add) document.getElementById("newBulletText").focus();
    }); //geef in de canvas-state aan om welk element en/of bullet het gaat, en geef pas daarna de dialog op volledig scherm met backdrop weer
}