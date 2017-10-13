export interface Notifiable{
  notify(notice)
}
interface Notifying extends Notifiable{
  setNotifiable(n:Notifiable)
  notifiable():Notifiable
  elements():Notifying[]
  notifyParent()
} 
  