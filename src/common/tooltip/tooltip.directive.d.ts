import { EventEmitter, ViewContainerRef, ElementRef, Renderer, OnDestroy, NgZone } from '@angular/core';
import { PlacementTypes } from './position/placement.type';
import { StyleTypes } from './style.type';
import { AlignmentTypes } from './alignment.type';
import { ShowTypes } from './show.type';
import { TooltipService } from './tooltip.service';
export declare class TooltipDirective implements OnDestroy {
    private tooltipService;
    private viewContainerRef;
    private renderer;
    private element;
    private zone;
    tooltipCssClass: string;
    tooltipTitle: string;
    tooltipAppendToBody: boolean;
    tooltipSpacing: number;
    tooltipDisabled: boolean;
    tooltipShowCaret: boolean;
    tooltipPlacement: PlacementTypes;
    tooltipAlignment: AlignmentTypes;
    tooltipType: StyleTypes;
    tooltipCloseOnClickOutside: boolean;
    tooltipCloseOnMouseLeave: boolean;
    tooltipHideTimeout: number;
    tooltipShowTimeout: number;
    tooltipTemplate: any;
    tooltipShowEvent: ShowTypes;
    tooltipContext: any;
    show: EventEmitter<{}>;
    hide: EventEmitter<{}>;
    private readonly listensForFocus;
    private readonly listensForHover;
    private component;
    private timeout;
    private mouseLeaveContentEvent;
    private mouseEnterContentEvent;
    private documentClickEvent;
    constructor(tooltipService: TooltipService, viewContainerRef: ViewContainerRef, renderer: Renderer, element: ElementRef, zone: NgZone);
    ngOnDestroy(): void;
    onFocus(): void;
    onBlur(): void;
    onMouseEnter(): void;
    onMouseLeave(target: any): void;
    onMouseClick(): void;
    showTooltip(immediate?: boolean): void;
    addHideListeners(tooltip: any): void;
    hideTooltip(immediate?: boolean): void;
    private createBoundOptions();
}
