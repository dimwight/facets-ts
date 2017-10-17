export interface Notifiable{
  notify(notice)
}
export interface Notifying extends Notifiable{
  setNotifiable(n:Notifiable)
  notifiable():Notifiable
  elements():Notifying[]
  notifyParent()
} 
export abstract class NotifyingCore implements Notifying{
  private notifiable_: Notifiable
  setNotifiable(n: Notifiable) {
    this.notifiable_=n
  }
  notifiable(): Notifiable {
    return this.notifiable_
  }
  notifyParent() {
    this.notifiable_.notify(this)
  }
  notify(notice: any) {
    throw new Error("Method not implemented.");
  }
  abstract elements():Notifying[]
}
  