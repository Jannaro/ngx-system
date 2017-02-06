import { InjectionRegistery } from '../../services/injection-registery.service';
import { InjectionService } from '../../services/injection.service';
export declare class TooltipService extends InjectionRegistery {
    injectionService: InjectionService;
    type: any;
    constructor(injectionService: InjectionService);
}
