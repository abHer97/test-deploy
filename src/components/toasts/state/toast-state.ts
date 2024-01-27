import { Observable } from '../../../observer/entities/observable';
import { IToast } from '../entities/toast';

export const ToastState = new Observable<IToast>();

export function fireToast(data: IToast) {
  ToastState.notify(data);
}
