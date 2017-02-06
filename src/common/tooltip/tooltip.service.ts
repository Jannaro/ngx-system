import { Injectable } from '@angular/core';
import { InjectionRegistery } from '../../services/injection-registery.service';
import { InjectionService } from '../../services/injection.service';
import { TooltipContentComponent } from './tooltip.component';

@Injectable()
export class TooltipService extends InjectionRegistery {

  type: any = TooltipContentComponent;

  constructor(public injectionService: InjectionService) {
    super(injectionService);
  }

}
