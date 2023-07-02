import * as _ from "lodash";

export const KO = {
  menu: "저의 이름은 {{name}}입니다. 나이는 {{age}}데스~!!~",
  kiosk: "키오스크",
  paymentTotalAmount: "총 금액은 {{totalAmount}}원입니다. 결제하시겠습니까?",
};

// @ts-ignore
/**
 * @param languageKey key값
 * @param obj 문자 보간을 사용할 객체를 전달. 깊이는 1이어야 함.
 * @returns KO 에서 값을 가져옴.
 */
function interpolateString(languageKey: keyof typeof KO, obj: any): string {
  const centense = KO[languageKey];
  return centense.replace(/{{(.*?)}}/g, (match, key) => {
    return obj[key].toString();
  });
}

export function getLanguageText(languageKey: keyof typeof KO, obj: Object) {
  if (obj !== undefined) {
    return interpolateString(languageKey, obj);
  }

  // 보간법 사용하기 위해 만든 텍스트인데 보간법으로 사용안할 경우 에러 발생.
  const isInterpolateString = KO[languageKey].match(/{{(.*?)}}/g);
  if (isInterpolateString !== null) {
    throw new Error(`${languageKey}는 보간법을 사용해야 하는 문자입니다.`);
  }

  return KO[languageKey];
}
