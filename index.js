

const form = document.getElementById('color-form')

form.addEventListener('submit', handleFormSubmit)

function handleFormSubmit(e) {
    e.preventDefault()

    const formValue = getFormValue()

    fetchColorScheme(formValue.colorHex, formValue.colorMode)



}

function getFormValue() {
    const rawColorHex = document.getElementById('seed-color').value

    const colorHex = rawColorHex.replace(/^#/, "")
    const colorMode = document.getElementById('color-mode').value



    return {
        colorHex,
        colorMode
    }
}

function fetchColorScheme(hex, mode) {
    fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=5`)
        .then(res => res.json())
        .then(colorData => {
            const colorScheme = colorData.colors.map(newColor => {
                return newColor.hex.value
            })
            console.log(colorScheme)
            handleRenderHTML(colorScheme)
        })
}

function handleRenderHTML(colorScheme) {
    const colorColumns = document.querySelectorAll('.color-grid-item')
    const colorHexText = document.querySelectorAll('.color-hex-text')

    colorScheme.forEach((color, i) => {
        if (colorColumns[i]) {
            colorColumns[i].style.backgroundColor = color
        }
        if (colorHexText[i]) {
            colorHexText[i].textContent = color
        }
    })
}

// hello world