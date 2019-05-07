<script>
import VueTerminal from 'vue-terminal-ui'
import { VueTyper } from 'vue-typer'
import poem1 from '@/assets/json/1.json'
import poem2 from '@/assets/json/2.json'
import poem3 from '@/assets/json/3.json'
import poem4 from '@/assets/json/4.json'
import poem5 from '@/assets/json/5.json'
import poem6 from '@/assets/json/6.json'
import poem7 from '@/assets/json/7.json'
import poem8 from '@/assets/json/8.json'
import poem9 from '@/assets/json/9.json'
import poem10 from '@/assets/json/10.json'
import test from '@/components/test'
import reboot from '@/components/reboot'
export default {
  components: {
    VueTerminal,
    VueTyper,
    test,
    reboot
  },
  asyncData() {
    return {
      showIntro: true,
      notShowingPoem: true,
      listCmd: ['poeme-1', 'poeme-2', 'poeme-3', 'poeme-4', 'poeme-5', 'poeme-6', 'poeme-7', 'poeme-8', 'poeme-9', 'poeme-10'],
      selectedPoem: null,
      listEntry: ['', poem1, poem2, poem3, poem4, poem5, poem6, poem7, poem8, poem9, poem10],
      listChar: [],
      listCharStart: [],
      spaceInstruct: false,
      spaceEntry: null,
      poemFinished: false,
      poemIntroFinished: false,
      showRebootAnim: false
    }
  },
  mounted() {
    if (this.showIntro) {
      const thus = this
      setTimeout(function () {
        thus.showIntro = false
      }, 5000)
    }
  },
  methods: {
    onCommandPoem(data) {

    },
    onCommand(data, resolve, reject) {
      /* eslint-disable */    
      const elem = this.listCmd.find( elem => { return elem === data.text })
      if (data.text === 'raconte') {
        this.notShowingPoem = false
        this.listCharStart.push(1)
        this.selectedPoem = this.listEntry[Math.floor(Math.random() * 10) + 0]
      } else if (data.text === 'aide') {
        resolve("10 poèmes sont actuellement stockés dans ma base de données. Entrez poeme-X pour lire l'un des 10 poèmes")
      } else if (elem) {
        if (elem.includes('poeme-')) {
          let temp = parseInt(elem[elem.length - 1])
          this.notShowingPoem = false
          this.listCharStart.push(1)
          this.selectedPoem = this.listEntry[temp]
        }
      } else {
        resolve('Commande inconnue, je peux vous raconter un poème avec la commande `raconte` ou `aide` pour voir la liste des poèmes disponibles')
      }
    },
    showLine(index, elem) {
      if (elem) {
        console.log('ICI')
        if (this.listCharStart.find( elem => { return elem === index })) {
          return true
        } else {
          return false
        }
      } else {
        if (this.listChar.find( elem => { return elem === index })) {
          return true
        } else {
          return false
        }
      }
    },
    onComplete(elem) {
      window.scrollTo(0,(document.querySelector(".index").scrollHeight + 60))
      if (elem === 0) {
        if (this.listCharStart[this.listCharStart.length - 1] + 1 >= this.selectedPoem.start.length) {
          this.poemIntroFinished = true
          this.listChar.push(1)
        } else {
          this.listCharStart.push(this.listCharStart[this.listCharStart.length - 1] + 1)
        }
      } else {
        if (this.listChar[this.listChar.length -1] + 1 >= this.selectedPoem.poem.length) {
          this.poemFinished = true
        } else {
          this.listChar.push(this.listChar[this.listChar.length -1] + 1)
        }
      }

    },
    continuePoem() {
      this.showRebootAnim = true
      window.scrollTo(0,(document.querySelector(".index").scrollHeight + 60))
      setTimeout(function() {
        window.scrollTo(0,(document.querySelector(".index").scrollHeight + 60))
      }, 200)
    },
    onCompleteFinal() {
      document.getElementById('continue').focus()
    },
    rebootFinished() {
      this.listChar = []
      this.listCharStart = []
      this.poemFinished = false
      this.poemIntroFinished = false
      this.notShowingPoem = true
      this.animrestart = true
      this.showRebootAnim = false
    }
  }
}
</script>
<template lang="pug">
.index(ref='command')
  div.startcommand
    test.introstyle(id='introElem')
    VueTerminal.command(v-if='notShowingPoem && !showRebootAnim && !showIntro', intro='***********Poème machine v0.5*************', console-sign='$', height='500px', allow-arbitrary, @command='onCommand')
    template(v-if='!notShowingPoem && !showRebootAnim')   
      vue-typer(v-if='showLine(index, 1)', v-for='(elem, index) in selectedPoem.start', :key='index', @completed='onComplete(0)', id='type', :text='elem', :erase-on-complete='false', :repeat='0', caret-animation='blink')
    template(v-if='!notShowingPoem && poemIntroFinished && !showRebootAnim')
      vue-typer(v-if='showLine(index)', v-for='(elem, index) in selectedPoem.poem', :key="index + '-other'", @completed='onComplete', id='type', :text='elem', :erase-on-complete='false', :repeat='0', caret-animation='blink')
    template(v-if='poemFinished && !showRebootAnim')
      div.continue(@keyup='continuePoem', tabindex="0", id='continue')
        vue-typer.typernext(text='appuyer sur une touche pour redémarrer le programme...', :erase-on-complete='false', :repeat='0', caret-animation='blink', @completed='onCompleteFinal')
    template(v-if='showRebootAnim')
      div.reboot
        reboot(@next='rebootFinished')
</template>
<style>
.startcommand{
  padding-bottom: 2rem;
}
.reboot{
  position: absolute;
  background: #0000FF !important;
  left: 0 !important;
  top: 1000px !important;
  width: 100vw !important;
}
#introElem{
  height: 0;
  overflow: hidden;
  background: #0000FF;
  -moz-animation: slide 0.1s ease 5s forwards;
  -webkit-animation: slide 0.1s ease 5s forwards;
  -o-animation: slide 0.1s ease 5s forwards;
  -ms-animation: slide 0.1s ease 5s forwards;
  animation: slide 0.1s ease 5s forwards;
}
@-webkit-keyframes slide{
  from {height: 0;}
  to {height: 790px;}
}
.continue{
  height: 60px;
  display: flex;
  border: 1px solid #0000FF !important;
  outline: 1px solid #0000FF !important;
}
.continue:active{
  background: #0000FF !important;
  color: #0000FF !important;
  border: 1px solid #0000FF !important;
}
.continue::selection{
  background: #0000FF !important;
  color: #0000FF !important;
  border: 1px solid #0000FF !important;
}
.continue:focus{
  background: #0000FF !important;
  color: #0000FF !important;
  border: 1px solid #0000FF !important;
}
.inputcontinue .v-input__control .v-input__slot{
  height: 28px;
  color: white;
  background-color: #0000FF !important;
  font-family: "Courier New", Courier, monospace;
}
.type{
  font-family: "Courier New", Courier, monospace;
  font-size: 28px;
  color: white;
}
.vue-typer {
  display: flex;
}
.vue-typer .custom.char {
  color: white;
  font-family: "Courier New", Courier, monospace;
  font-size: 28px;
}
.vue-typer .custom.caret {
  width: 10px;
  height: 28px !important;
  background-color: white;
}
.typernext{
  margin-bottom: 1rem;
  /* width: 50%; */
}
.typernext .complete {
  width: 10px;
  height: 28px !important;
  background-color: white;
  display: inline-block !important;
}
.index{
  background-color: #0000FF !important;
  font-family: "Courier New", Courier, monospace;
  font-size: 28px;
}
.command .prompt{
  background-color: #0000FF !important;
  font-family: "Courier New", Courier, monospace;
  font-size: 28px;
}
.content{
  background-color: #0000FF !important;
}
</style>
