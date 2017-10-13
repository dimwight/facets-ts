export interface Notifiable{
  notify(notice)
}
interface Notifying extends Notifiable{
  setNotifiable(n:Notifiable)
  notifiable():Notifiable
  elements():Notifying[]
  notifyParent()
} 
class NotifyingCore implements Notifying{
  setNotifiable(n: Notifiable) {
    throw new Error("Method not implemented.");
  }
  notifiable(): Notifiable {
    throw new Error("Method not implemented.");
  }
  elements(): Notifying[] {
    throw new Error("Method not implemented.");
  }
  notifyParent() {
    throw new Error("Method not implemented.");
  }
  notify(notice: any) {
    throw new Error("Method not implemented.");
  }
}
  