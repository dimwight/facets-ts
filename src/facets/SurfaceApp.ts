import {
  Facets,
  FacetsApp,
  Target,
} from '../facets/Facets';
export abstract class SurfaceApp implements FacetsApp{
  constructor(readonly facets:Facets){
  }
  abstract getContentTrees():Target|Target[];
  onRetargeted(activeTitle:string):void{}
  abstract buildLayout():void;
  buildSurface(){
    this.facets.buildApp(this);
  }
}
