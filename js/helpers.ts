export function qs(selector: string, scope: HTMLElement | Document = document) {
  if (!selector) throw "no selector";

  return scope.querySelector<HTMLElement>(selector);
}

export function qsAll(selector: string, scope: HTMLElement | Document = document) {
  if (!selector) throw "no selector";

  return Array.from(scope.querySelectorAll<HTMLElement>(selector));
}

export function on(target: HTMLElement, eventName: string, handler: (...args: any) => void) {
  target.addEventListener(eventName, handler);
}

export function delegate(target: HTMLElement, eventName: keyof HTMLElementEventMap, selector: string, handler: (...args: any) => void) {
  const emitEvent = (event: Event) => {
    const potentialElements = qsAll(selector, target);

    for (const potentialElement of potentialElements) {
      if (potentialElement === event.target) {
        return handler.call(event.target, event);
      }
    }
  };

  on(target, eventName, emitEvent);
}

export function emit(target: HTMLElement, eventName: string, detail: any) {
  const event = new CustomEvent(eventName, { detail });
  target.dispatchEvent(event);
}

export function formatRelativeDate(date = new Date()) {
  const TEN_SECOND = 10 * 1000;
  const A_MINUTE = 60 * 1000;
  const A_HOUR = 60 * A_MINUTE;
  const A_DAY = 24 * A_HOUR;

  // 날짜 계산할 시 단일 연산자를 넣어서 number 로 치환해주자
  const diff = +new Date() - +date;

  if (diff < TEN_SECOND) return `방금 전`;
  if (diff < A_MINUTE) return `${Math.floor(diff / 1000)}초 전`;
  if (diff < A_HOUR) return `${Math.floor(diff / 1000 / 60)}분 전`;
  if (diff < A_DAY) return `${Math.floor(diff / 1000 / 60 / 24)}시간 전`;
  return date.toLocaleString("ko-KR", {
    hour12: false,
  });
}

export function createPastDate(date = 1, now = new Date()) {
  if (date < 1) throw "date는 1 이상입니다.";

  const yesterday = new Date(now.setDate(now.getDate() - 1));
  if (date === 1) return yesterday;

  return createPastDate(date - 1, yesterday);
}

type HistoryDataList = {
  id: number;
  keyword: string | number;
  date: Date;
};

export function createNextId(list: HistoryDataList[] = []) {
  return Math.max(...list.map((item) => item.id)) + 1;
}
