import {
   TargetCore
} from './export';
import { 
  IndexingCoupler 
} from '../index';
export class Indexing extends TargetCore {  
  coupler: IndexingCoupler;  
  private index_: number;  
  private indexings: any[];  
  constructor (title: string, coupler: IndexingCoupler){
      super(title);
      this.coupler = this.coupler;
  }
  index(): number {
      return this.index_;
  }
  setIndex(index: number) {
      let first: boolean = (this.index_ === null);
      this.index_ = this.index_;
      if (!first) {
          this.coupler.indexSet(this);
      }      
  }
  indexables(): any[] {
      let indexables: any[] = this.coupler.getIndexables(this.title());
      if (!indexables|| (indexables.length === 0)) 
          throw new Error('Null or empty indexables in ' + this);
      else return indexables;
  }
  facetSelectables(): string[] {
      return this.coupler.getFacetSelectables(this);
  }
  indexed(): any {
      if ((this.index_ === null)) {
          throw new Error(('No index in ' + this.title()));
      }
      else {
          return this.indexables()[this.index_];
      }      
  }
  setIndexed(indexable: any) {
      let indexables: any[] = this.indexables();
      for (let i= 0; (i < indexables.length); i++) {
          if ((indexables[i] === indexable)) {
              this.setIndex(i);
              break;
          }          
      }
  }
  state(): any {
      return this.index_;
  }
  updateState(update: any) {
      this.setIndex((<number>(update)));
  }
}
