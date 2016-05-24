import { Component, Inject, Input, ElementRef } from '@angular/core';

import { AnimationService, AnimationBuilder, AnimationOptions } from 'css-animator';

import cardTemplate from './card.html';
import cardStyle from './card.less';
import cardAnimationsStyle from './card-animations.less';

@Component({
  selector: 'card',
  template: cardTemplate,
  styles: [
    cardStyle,
    cardAnimationsStyle
  ],
  directives: []
})
export class CardComponent {

  @Input('cardType') public cardType: string|number;

  private _animationBuilder: AnimationBuilder;
  private _defaultShowOptions: AnimationOptions;
  private _defaultHideOptions: AnimationOptions;

  constructor(
    @Inject(ElementRef) private _elementRef: ElementRef,
    @Inject(AnimationService) animationService: AnimationService
    ) {
    this._animationBuilder = animationService.builder();
    this._defaultShowOptions = { type: 'fadeInRight' };
    this._defaultHideOptions = { type: 'fadeOutLeft' };
  }

  public show(options?: AnimationOptions): Promise<HTMLElement> {
    return this._animationBuilder
      .setOptions(options || this._defaultShowOptions)
      .show(this._elementRef.nativeElement);
  }

  public hide(options?: AnimationOptions): Promise<HTMLElement> {
    return this._animationBuilder
      .setOptions(options || this._defaultHideOptions)
      .hide(this._elementRef.nativeElement);
  }

}
