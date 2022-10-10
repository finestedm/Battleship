import { players } from "./factories/player";

export function showModal() {
    const modal = document.createElement('modal');
    const body = document.querySelector('body')
    modal.innerHTML =
        `<div class="modal"  data-bs-backdrop="static" data-bs-keyboard="false" id="my-modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Choose player name</h5>
                    </div>
                    <div class="modal-body">
                        <div class="input-group">
                            <span class="input-group-text">Player Name</span>
                            <input type='text' id='new-player-name' class="form-control" required aria-label="Player name" placeholder='name'></>
                         </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" id='btn-name-save' class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>`
    body.append(modal)
}

