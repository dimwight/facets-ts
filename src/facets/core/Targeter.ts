import {Notifiable,Target,Facet} from './export';
import {Retargetable} from './local';
export interface Targeter extends Notifiable,Retargetable{
  title():string;
  target():Target;
  setNotifiable(n:Notifiable);
  elements():Targeter[];
  attachFacet(f:Facet);
  retargetFacets();
}