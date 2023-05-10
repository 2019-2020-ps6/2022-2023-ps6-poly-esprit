import {Directive, ElementRef} from '@angular/core';
import {ConfigurationService} from "../service/configuration.service";

@Directive({
  selector: '[appAdaptThemeConfig]'
})
export class AdaptConfigThemeDirective {
  constructor(
    private el: ElementRef,
    private configurationService: ConfigurationService
  ) {
    this.configurationService.themeConfiguration$.subscribe((themeConfigurations)=>{
      if(themeConfigurations.isTextNormalSelected){
        this.el.nativeElement.style.fontSize = '20px';
      }else{
        this.el.nativeElement.style.fontSize = '30px';
        this.el.nativeElement.style.fontWeight = 'bold';
      }
      if (themeConfigurations.isButtonNormalSelected) {
        this.el.nativeElement.style.width = 'auto';
        this.el.nativeElement.style.height = '100px';

      } else {
        this.el.nativeElement.style.width = 'auto';
        this.el.nativeElement.style.height = '150px';      }
    })
  }

}
