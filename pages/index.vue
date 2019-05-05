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
export default {
  components: {
    VueTerminal,
    VueTyper
  },
  asyncData() {
    return {
      notShowingPoem: true,
      listCmd: ['help', 'poem-1'],
      Jsonpoem1: poem1,
      Jsonpoem2: poem2,
      Jsonpoem3: poem3,
      Jsonpoem4: poem4,
      Jsonpoem5: poem5,
      Jsonpoem6: poem6,
      Jsonpoem7: poem7,
      Jsonpoem8: poem8,
      Jsonpoem9: poem9,
      Jsonpoem10: poem10,
      selectedPoem: null,
      listEntry: [],
      spaceInstruct: false,
      spaceEntry: null
    }
  },
  mounted() {
  },
  methods: {
    onCommandPoem(data) {

    },
    onCommand(data, resolve, reject) {
      /* eslint-disable */
      console.log('CO', data)      
      const elem = this.listCmd.find( elem => { return elem === data.text })
      if (elem === 'poem-1') {
        this.notShowingPoem = false
        this.listEntry.push(1)
        this.selectedPoem = this.Jsonpoem5
      } else if (elem) {
        setTimeout(()=> {
          resolve(elem)
        }, 300)
      } else {
        setTimeout(()=> {
          resolve('cmd not find, type help to see list of cmd <br> <testComp></testComp> Commande inconnue, entrez help pour voir la liste des commandes')
        }, 300)
      }
    },
    showLine(index) {
      if (this.listEntry.find( elem => { return elem === index })) {
        return true
      } else {
        return false
      }
    },
    onComplete() {
      if (this.listEntry[this.listEntry.length -1] + 1 >= this.selectedPoem.poem.length) {
        this.notShowingPoem = true
        this.listEntry = []
        //setTimeout(fun)
        // on a fini mettre une option pour dire à l'utilisateur de taper sur entree pour continuer
      } else {
        this.spaceInstruct = true
        document.getElementById('continue').focus()
      }      
    },
    continuePoem() {
      if (this.spaceInstruct) {
        this.spaceInstruct = false
        this.listEntry.push(this.listEntry[this.listEntry.length -1] + 1)
      }
    }
  }
}
</script>
<template lang="pug">
.index
  div.startcommand
    // h1 C:/
    //input.command(v-if='notShowingPoem', type='text', v-model='textEntry', @keyup.entry='notShowingPoem = false', placeholder='_')
    VueTerminal.command(v-if='notShowingPoem', intro='Bonjour', console-sign='$', height='500px', allow-arbitrary, @command='onCommand')
    template(v-if='!notShowingPoem')
      vue-typer(v-if='showLine(index)', v-for='(elem, index) in selectedPoem.poem', :key='index', @completed='onComplete', id='type', :text='elem', :erase-on-complete='false', :repeat='0', caret-animation='blink')
      div.continue(@keyup.space='continuePoem', tabindex="0", id='continue')
        vue-typer.typernext(v-if='spaceInstruct', text='space to continue', :erase-on-complete='false', :repeat='0', caret-animation='blink')
</template>
<style>
.continue{
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
  width: 50%;
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
