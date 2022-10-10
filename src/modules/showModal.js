import { players } from "./factories/player";

export function showModal() {
    const modal = document.createElement('modal');
    const body = document.querySelector('body')
    modal.innerHTML =
        `<div class="modal"  data-bs-backdrop="static" data-bs-keyboard="false" id="my-modal" tabindex="-1">
            <div class="modal-dialog">
                <form class="modal-content needs-validation" novalidate onsubmit="return false">
                    <div class="modal-header">
                        <h5 class="modal-title">Choose player name</h5>
                    </div>
                    <div class="modal-body">
                        <div class="input-group">
                            <span class="input-group-text">Player Name</span>
                            <input type='text' id='new-player-name' class="form-control" required aria-label="Player name" placeholder='Player name' pattern='[a-zA-Z]+'></>
                         </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" id='btn-name-save' class="btn btn-primary">Save changes</button>
                    </div>
                </form>
            </div>
        </div>`
    body.append(modal)

    const playerNameInput = document.getElementById('new-player-name');
    playerNameInput.value = 'Human'
}

export function bootstrapValidation() {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
};
