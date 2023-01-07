// SELECTORS
const btnPair = document.querySelector('#pair')
const btnImpair = document.querySelector('#impair')
const numberSpan = document.querySelector('#number')
const scoreSpan = document.querySelector('#score')

class Game {
    constructor(winRoundsNum, intervalGap) {
        this.winRoundsNum = winRoundsNum
        this.intervalGap = intervalGap
        this.score = 0
        this.play()
    }

    async play() {
        try {
            const { number, isPair } = this.getRamdomNumber
            this.setElemText(numberSpan, number)
            const resValue = await Promise.race([
                this.timeOutInterval(),
                this.resolveWhenClicked(btnPair, true),
                this.resolveWhenClicked(btnImpair, false),
            ])
            if((isPair && resValue) || (!isPair && !resValue)) {
                this.score++
                this.setElemText(scoreSpan, this.score)
            } else {
                throw new Error('wrong choise')
            }
        }
        catch(err) {}
        finally {
            if(this.score >= 10) {
                alert('Game Over')
            } else {
                this.play()
            }
        }
    }

    get getRamdomNumber() {
        const number= Math.floor(Math.random() * 100)
        return ({
            number,
            isPair: number%2 == 0
        }) 
    }

    setElemText(element, txt) {
        return element.innerText = txt
    }

    timeOutInterval() {
        return new Promise((resolve, reject) => {
            setTimeout(() => reject('Time out'), this.intervalGap)
        })
    }

    resolveWhenClicked(element, resValue) {
        return new Promise((resolve) => {
            element.addEventListener('click', () => resolve(resValue))
        })
    }
}

new Game(10, 5000)