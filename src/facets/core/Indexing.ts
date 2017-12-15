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
      let first = !this.index_;
      this.index_ = index;
      if (!first)this.coupler.targetStateUpdated(this.state(),this.title());
  }
  indexables(): any[] {
      let indexables: any[] = this.coupler.getIndexables(this.title());
      if (!indexables|| (indexables.length === 0)) 
          throw new Error('Null or empty indexables in ' + this);
      else return indexables;
  }
  uiSelectables(): string[] {
    let newSelectable=this.coupler.newUiSelectable
        ||((indexable)=>(indexable as string));
    return this.indexables().map(each=>newSelectable(each));      
  }
  indexed(): any {
      if (!this.index_)throw new Error(('No index in ' + this.title()));
      else return this.indexables()[this.index_];
  }
  setIndexed(indexable: any) {
      for(const [at,i] of this.indexables().entries())
          if (i === indexable) {
              this.setIndex(i as number);
              break;
          }          
  }
  state(): any {
      return this.index_;
  }
  updateState(update: any) {
      this.setIndex(update);
  }
}
