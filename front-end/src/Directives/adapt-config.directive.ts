import {Directive, ElementRef} from '@angular/core';
import {ConfigurationService} from "../service/configuration.service";

@Directive({
  selector: '[appAdaptConfig]'
})
export class AdaptConfigDirective {
  constructor(
    private el: ElementRef,
    private configurationService: ConfigurationService
  ) {
    this.configurationService.quizConfigurations$.subscribe((quizConfigurations)=>{
      if(quizConfigurations.isTextNormalSelected){
        this.el.nativeElement.style.fontSize = '20px';
      }else{
        this.el.nativeElement.style.fontSize = '30px';
        this.el.nativeElement.style.fontWeight = 'bold';
      }
      if (quizConfigurations.isButtonNormalSelected) {
        this.el.nativeElement.style.width = '300px';
        this.el.nativeElement.style.height = '100px';

      } else {
        this.el.nativeElement.style.width = '320px';
        this.el.nativeElement.style.height = '150px';      }
    })
  }

}
