import { CONFIG } from '../../config/index';

const P = CONFIG.PREFERENCES;

export let isDebugEnabled = true;

export function createOptionsMenu() {
    const dialogId = 'optionsDialog',
        html = `
            <dialog id=${dialogId}>
                <form>
                    <fieldset>
                        <legend>Options</legend>
                        <p>
                            <input id=${P.ENABLE_DEBUG.inputId} type="checkbox"/>
                            <label for=${P.ENABLE_DEBUG.inputId}> Enable Debug </label>
                        </p>
                    </fieldset>
                    <menu>
                        <button id="confirmBtn" value="default"> OK </button>
                    </menu>
                </form>
            </dialog>
        `,
        $el = $(html).appendTo(document.body);

    $(`#${P.ENABLE_DEBUG.inputId}`, $el).on('change', function (this: HTMLInputElement) {
        isDebugEnabled = this.checked;
        GM.setValue(P.ENABLE_DEBUG.key, isDebugEnabled);
    });

    GM.registerMenuCommand('Enable Debug', showOptionsDialog, 'd');

    async function showOptionsDialog() {
        const dialog = document.getElementById('optionsDialog') as HTMLDialogElement;
        await init();
        dialog.showModal();

        async function init() {
            const checker = dialog.querySelector(`#${P.ENABLE_DEBUG.inputId}`) as HTMLInputElement;
            const doCheck = await GM.getValue(P.ENABLE_DEBUG.key);
            checker.checked = isDebugEnabled = doCheck;
        }
    }
}
