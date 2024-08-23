const $circle = document.querySelector('#circle')
const $score = document.querySelector('#score')


function start() {
    setScore(getScore())
    setImage()
}

function setScore(score) {
    localStorage.setItem('score', score)
    $score.textContent = score
}

function getScore() {
    return Number(localStorage.getItem('score')) ?? 0
}

function addOne() {
    setScore(getScore() + 1)
    setImage()
}


function setImage() {
    if (getScore() > 50) {
        $circle.setAttribute('src', './assets/cat_2.jpg')
    }

    if (getScore() > 120) {
        $circle.setAttribute('src', './assets/cat_3.jpg')
    }
}

$circle.addEventListener('click', event => {
    const rect = $circle.getBoundingClientRect()

    const offsetX = event.clientX - rect.left - rect.width / 2
    const offsetY = event.clientY - rect.top - rect.height / 2

    const Deg = 100

    const tiltX = (offsetY / rect.height) * Deg
    const tiltY = (offsetX / rect.width) * -Deg

    $circle.style.setProperty('--tiltX', `${tiltX}deg`)
    $circle.style.setProperty('--tiltY', `${tiltY}deg`)


    setTimeout(() => {
        $circle.style.setProperty('--tiltX', `0deg`)
        $circle.style.setProperty('--tiltY', `0deg`)
    }, 200)

    const plus_one = document.createElement('div')
    plus_one.classList.add('plus_1')
    plus_one.textContent = '+1'
    plus_one.style.left = `${event.clientX - rect.left}px`
    plus_one.style.top = `${event.clientY - rect.top}px`


    $circle.parentElement.appendChild(plus_one)

    addOne()

    setTimeout(() => {
        plus_one.remove()
    }, 2000)
})

start()