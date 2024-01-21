import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../data/quizz_questions.json"
import { question, questions } from 'src/app/data/types';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit {

  title:string = ""

  questions:questions |undefined
  questionSelected: question |undefined

  answers:string[] = []
  answerSelected:string[] = []

  questionIndex:number =0
  questionMaxIndex:number=0

  finished:boolean = false

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.title = quizz_questions.title
  
      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionMaxIndex = this.questions.length
    }

  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
      if (this.questions) {
        this.questionSelected = this.questions[this.questionIndex]
      }else {
        throw new Error("the questions does not exist");
      }
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results ]
    }
  }

  async checkResult(anwsers:string[]){

    const result = anwsers.reduce((previous, current, i, arr)=>{
        if(
          arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length
        ){
          return previous
        }else{
          return current
        }
    })

    return result
  }

  returnToInitialQuiz() {
    this.finished = false
    this.questionIndex = 0

    if (this.questions) {
      this.questionSelected = this.questions[this.questionIndex]
    }
  }

}
